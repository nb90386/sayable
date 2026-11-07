# Demo narration audio

`public/audio/permit-before.mp3` and `permit-after.mp3` are illustrative narrations of the sample permit form,
as posted and after repair. They are made with a text-to-speech model and are **not** recordings of VoiceOver,
NVDA, JAWS or any other screen reader. Cue ids, texts and timings live in `src/content/audio-cues.json`, which
`src/components/story/Problem.tsx` uses to highlight the element being spoken.

## Model and licence

Checked 2026-11-06 against the sources themselves.

| Item | Licence | Source |
| --- | --- | --- |
| Kokoro inference code (`kokoro` 0.9.4 on PyPI) | Apache-2.0 | https://github.com/hexgrad/kokoro/blob/main/LICENSE (GitHub API reports `Apache-2.0`), https://pypi.org/project/kokoro/0.9.4/ |
| Kokoro-82M v1.0 weights (`kokoro-v1_0.pth`) | Apache-2.0 | Model card front matter `license: apache-2.0`, https://huggingface.co/hexgrad/Kokoro-82M (revision `f3ff3571791e39611d31c381e3a41a3af07b4987`) |
| Voice packs (`voices/*.pt`, incl. `af_heart`) | Apache-2.0 (same repo, no separate terms) | https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md |
| misaki G2P (phonemiser used by `kokoro`) | Apache-2.0 | https://github.com/hexgrad/misaki |
| espeak-ng (misaki's fallback for unknown words) | GPL-3.0 | https://github.com/espeak-ng/espeak-ng |

What we found:

- The model card says: "This is an Apache-licensed model, and Kokoro has been deployed in numerous projects and
  commercial APIs. We welcome the deployment of the model in real use cases."
- VOICES.md lists the voices with quality grades and SHA-256 prefixes only. It has no separate licence, usage
  restriction or attribution requirement for any voice. The voice files sit in the same Apache-2.0 repository.
- Training data, per the model card: "permissive/non-copyrighted audio data", including public-domain audio,
  Apache/MIT-licensed audio and synthetic audio from closed TTS providers. Two CC BY datasets are credited on the
  card: Koniwa `tnc` (CC BY 3.0) and SIWIS (CC BY 4.0). This is provenance, not a restriction on the output.
- espeak-ng (GPL-3.0) runs only locally at generation time, as a fallback, and is not shipped with the site.
  Every word in our cues is in misaki's lexicon. The site ships only the MP3 output.
- Apache-2.0 notice duties apply when redistributing the code or weights, which we do not do. We credit the
  model anyway: the `voice`, `model` and `license` fields in `audio-cues.json`.

## Voice choice

Voice **`af_heart`**, speed **1.05**, used for both clips.

Tried `af_heart`, `af_bella`, `am_michael` and `af_nicole` at 1.0 and 1.08 on the longest cue ("Type of work. New
construction, check box, not checked. Addition, check box. Repair, check box."):

| Voice | Grade (VOICES.md) | 1.0x | 1.08x | Notes |
| --- | --- | --- | --- | --- |
| af_heart | A, flagship voice | 6.80 s | 6.45 s | Even, warm, restrained. Chosen. |
| af_bella | A- | 7.23 s | 6.83 s | Good quality, more animated delivery than a reading needs. |
| am_michael | C+ | 7.28 s | 6.93 s | Lower graded, quieter (peak 0.37) and less consistent. |
| af_nicole | B-, tagged as a headphones/whisper voice | 10.48 s | 9.75 s | Breathy and slow. Wrong register for this. |

`af_heart` has the highest grade and an even delivery, and it does not perform the text. At 1.05 it reads at about
180 words per minute, close to a default screen-reader rate, without rushing. The script trims each segment's
edge silence, so the highlight starts and ends with the speech.

## Output

| File | Duration | Size | Format |
| --- | --- | --- | --- |
| `permit-before.mp3` | 16.802 s | 135 KB | MP3, mono, 24 kHz, 64 kbps, about -16.6 LUFS, peak -1.6 dBFS |
| `permit-after.mp3` | 23.834 s | 191 KB | MP3, mono, 24 kHz, 64 kbps, about -16.6 LUFS, peak -1.4 dBFS |

Layout: 0.25 s lead-in, one segment per cue, 0.35 s silence between cues, 0.25 s tail. The cue texts are the same
as before. Loudness is two-pass `loudnorm` (target I=-16, TP=-1.5) in linear mode, which keeps the dynamics.
The true-peak ceiling makes it land at about -16.6.

## Reproduce

Everything goes outside the repo. `KOKORO_HOME` can be any scratch folder.

```sh
export KOKORO_HOME="$TMPDIR/kokoro"
mkdir -p "$KOKORO_HOME/weights/voices"

# 1. Python 3.12 env (kokoro 0.9.4 requires Python >=3.10,<3.13)
uv venv --python 3.12 "$KOKORO_HOME/.venv"
uv pip install --python "$KOKORO_HOME/.venv/bin/python" kokoro==0.9.4 soundfile \
  "en_core_web_sm @ https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.8.0/en_core_web_sm-3.8.0-py3-none-any.whl"

# 2. Weights pinned to the checked revision (SHA-256 prefixes in the model card: 496dba11, af_heart 0ab5709b)
B=https://huggingface.co/hexgrad/Kokoro-82M/resolve/f3ff3571791e39611d31c381e3a41a3af07b4987
curl -fL -o "$KOKORO_HOME/weights/config.json" "$B/config.json"
curl -fL -o "$KOKORO_HOME/weights/kokoro-v1_0.pth" "$B/kokoro-v1_0.pth"
curl -fL -o "$KOKORO_HOME/weights/voices/af_heart.pt" "$B/voices/af_heart.pt"
shasum -a 256 "$KOKORO_HOME/weights/kokoro-v1_0.pth" "$KOKORO_HOME/weights/voices/af_heart.pt"

# 3. Generate, from the repo root. Rewrites both MP3s and the timings in audio-cues.json.
HF_HUB_OFFLINE=1 KOKORO_WEIGHTS="$KOKORO_HOME/weights" \
  "$KOKORO_HOME/.venv/bin/python" scripts/make-audio-kokoro.py
```

Optional overrides are `SAYABLE_VOICE=af_bella` and `SAYABLE_SPEED=1.0`. The script needs `ffmpeg` and `ffprobe`
on `PATH`. It exits with an error if an MP3's duration differs from the rendered audio by more than 50 ms.

Notes:

- We download with curl rather than `huggingface_hub` because, inside the macOS sandbox Claude Code uses,
  `huggingface_hub`'s `truststore` TLS fails with `OSStatus -26276`. Without `KOKORO_WEIGHTS`, the script lets
  `kokoro` fetch from the Hub as usual.
- `misaki` tries to `pip install` `en_core_web_sm` on first run. A uv venv has no pip, so step 1 installs it.
- Kokoro is not bit-for-bit deterministic across torch versions. If you regenerate, the timings will change slightly,
  and the script rewrites them.
- `scripts/make-audio.mjs` is the old macOS `say` generator. Running it would replace this audio with the Samantha voice.
