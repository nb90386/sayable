"""Generate the permit-form narration with Kokoro-82M (Apache-2.0).

Each cue in src/content/audio-cues.json is synthesised as its own segment, trimmed
of edge silence, and joined with fixed silence so every cue has an exact start/end.
The cue ids and texts are read from the JSON and written back unchanged; only the
timings, durations and voice metadata are updated.

This is an illustrative narration, NOT a screen-reader recording.

Setup (outside the repo, see docs/AUDIO.md):
    uv venv --python 3.12 "$KOKORO_HOME/.venv"
    uv pip install --python "$KOKORO_HOME/.venv/bin/python" kokoro==0.9.4 soundfile \
        "en_core_web_sm @ https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.8.0/en_core_web_sm-3.8.0-py3-none-any.whl"

Run from the repo root:
    KOKORO_WEIGHTS="$KOKORO_HOME/weights" "$KOKORO_HOME/.venv/bin/python" scripts/make-audio-kokoro.py

KOKORO_WEIGHTS is a folder holding config.json, kokoro-v1_0.pth and voices/<voice>.pt
from hexgrad/Kokoro-82M. Without it, kokoro downloads them from the Hugging Face Hub.
Requires ffmpeg and ffprobe on PATH.
"""

import json
import os
import subprocess
import sys
import tempfile
from datetime import date
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro import KModel, KPipeline

REPO_ID = "hexgrad/Kokoro-82M"
VOICE = os.environ.get("SAYABLE_VOICE", "af_heart")
SPEED = float(os.environ.get("SAYABLE_SPEED", "1.05"))
SR = 24000
LEAD = 0.25  # silence before the first cue, so the first word is never clipped
GAP = 0.35  # silence between cues
EDGE_PAD = 0.03  # keep this much of each segment's own lead/tail when trimming
TRIM_DB = -45.0  # samples quieter than this (relative to full scale) count as silence
BITRATE = "64k"
TARGET_LUFS = -16.0

ROOT = Path(__file__).resolve().parent.parent
CUES_PATH = ROOT / "src/content/audio-cues.json"
OUT_DIR = ROOT / "public/audio"


def ffprobe_duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout
    return float(out.strip())


def trim(audio: np.ndarray) -> np.ndarray:
    threshold = 10 ** (TRIM_DB / 20)
    loud = np.flatnonzero(np.abs(audio) > threshold)
    if loud.size == 0:
        raise RuntimeError("Kokoro returned a silent segment")
    pad = int(EDGE_PAD * SR)
    return audio[max(loud[0] - pad, 0): min(loud[-1] + pad + 1, audio.size)]


def load_pipeline() -> tuple[KPipeline, str]:
    weights = os.environ.get("KOKORO_WEIGHTS")
    if weights:
        w = Path(weights)
        model = KModel(repo_id=REPO_ID, config=str(w / "config.json"), model=str(w / "kokoro-v1_0.pth")).eval()
        return KPipeline(lang_code="a", repo_id=REPO_ID, model=model), str(w / "voices" / f"{VOICE}.pt")
    return KPipeline(lang_code="a", repo_id=REPO_ID), VOICE


def synth(pipeline: KPipeline, voice: str, text: str) -> np.ndarray:
    chunks = [r.audio.numpy() for r in pipeline(text, voice=voice, speed=SPEED) if r.audio is not None]
    if not chunks:
        raise RuntimeError(f"No audio for: {text!r}")
    return trim(np.concatenate(chunks).astype(np.float32))


def loudnorm_encode(wav: Path, mp3: Path) -> None:
    # Two-pass loudnorm: measure, then apply linear gain to hit the target exactly.
    base = f"loudnorm=I={TARGET_LUFS}:TP=-1.5:LRA=11"
    probe = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", str(wav), "-af", f"{base}:print_format=json", "-f", "null", "-"],
        check=True, capture_output=True, text=True,
    ).stderr
    m = json.loads(probe[probe.rindex("{"): probe.rindex("}") + 1])
    second = (
        f"{base}:linear=true:measured_I={m['input_i']}:measured_TP={m['input_tp']}"
        f":measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}"
    )
    subprocess.run(
        ["ffmpeg", "-loglevel", "error", "-y", "-i", str(wav), "-af", second, "-ar", str(SR), "-ac", "1",
         "-c:a", "libmp3lame", "-b:a", BITRATE, "-map_metadata", "-1", str(mp3)],
        check=True,
    )


def main() -> None:
    data = json.loads(CUES_PATH.read_text())
    pipeline, voice = load_pipeline()
    tmp = Path(tempfile.mkdtemp(prefix="sayable-kokoro-"))
    lead = np.zeros(int(LEAD * SR), dtype=np.float32)
    gap = np.zeros(int(GAP * SR), dtype=np.float32)

    for clip in ("before", "after"):
        parts = [lead]
        t = lead.size
        cues = []
        for cue in data[clip]["cues"]:
            seg = synth(pipeline, voice, cue["text"])
            cues.append({**cue, "start": round(t / SR, 3), "end": round((t + seg.size) / SR, 3)})
            parts += [seg, gap]
            t += seg.size + gap.size
        tail = np.zeros(int(0.25 * SR), dtype=np.float32)
        audio = np.concatenate(parts[:-1] + [tail])
        wav = tmp / f"permit-{clip}.wav"
        sf.write(wav, audio, SR, subtype="PCM_16")
        mp3 = OUT_DIR / f"permit-{clip}.mp3"
        loudnorm_encode(wav, mp3)
        duration = ffprobe_duration(mp3)
        expected = audio.size / SR
        if abs(duration - expected) > 0.05:
            sys.exit(f"{clip}: mp3 duration {duration:.3f}s differs from rendered {expected:.3f}s")
        data[clip] = {**data[clip], "duration": round(duration, 3), "cues": cues}
        print(f"{clip}: {duration:.3f}s, {len(cues)} cues, {mp3.stat().st_size} bytes")

    meta = {
        "voice": f"Kokoro-82M (Apache-2.0), voice {VOICE}",
        "model": f"{REPO_ID} v1.0",
        "license": "Apache-2.0",
        "speed": SPEED,
        "generated": date.today().isoformat(),
    }
    CUES_PATH.write_text(json.dumps({**meta, "before": data["before"], "after": data["after"]}, indent=2) + "\n")


if __name__ == "__main__":
    main()
