"use client";

import { useEffect, useRef, useState } from "react";
import data from "@/content/audio-cues.json";
import { usePrefersReducedMotion } from "@/lib/useInView";
import { track as trackEvent } from "@/lib/analytics";
import { Segmented } from "../motion/Segmented";
import { PermitSheet, SheetLegend } from "../doc/PermitSheet";
import { regions } from "../doc/permit";

type Mode = "before" | "after";
type Cue = { id: string; text: string; start: number; end: number };
const BARS = 44;

/** Chapter 2. The same form, heard two ways. One document, one player, one caption line. */
export function Problem() {
  const [mode, setMode] = useState<Mode>("before");
  const audio = useRef<HTMLAudioElement | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [levels, setLevels] = useState<number[]>(() => Array(BARS).fill(0.18));
  const reduced = usePrefersReducedMotion();
  const track = data[mode];

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    let raf = 0;
    const loop = () => {
      setT(a.currentTime);
      const an = analyser.current;
      if (an) {
        const buf = new Uint8Array(an.frequencyBinCount);
        an.getByteFrequencyData(buf);
        const step = Math.floor(buf.length / BARS) || 1;
        setLevels(Array.from({ length: BARS }, (_, i) => Math.max(0.12, (buf[i * step] ?? 0) / 255)));
      }
      if (!a.paused) raf = requestAnimationFrame(loop);
    };
    const on = () => {
      setPlaying(true);
      raf = requestAnimationFrame(loop);
    };
    const off = () => {
      setPlaying(false);
      cancelAnimationFrame(raf);
      setT(a.currentTime);
    };
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("ended", off);
    return () => {
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("ended", off);
      cancelAnimationFrame(raf);
    };
  }, []);

  const choose = (m: Mode) => {
    const a = audio.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    setT(0);
    setMode(m);
  };

  const toggle = async () => {
    const a = audio.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      return;
    }
    try {
      if (!ctx.current && typeof window.AudioContext !== "undefined") {
        ctx.current = new AudioContext();
        const src = ctx.current.createMediaElementSource(a);
        analyser.current = ctx.current.createAnalyser();
        analyser.current.fftSize = 256;
        src.connect(analyser.current);
        analyser.current.connect(ctx.current.destination);
      }
      await ctx.current?.resume();
    } catch {
      /* the waveform is decoration; playback works without it */
    }
    if (a.ended) a.currentTime = 0;
    trackEvent("demo_play", { version: mode });
    await a.play();
  };

  const replay = async () => {
    const a = audio.current;
    if (!a) return;
    a.currentTime = 0;
    setT(0);
    if (a.paused) await toggle();
  };

  const cue: Cue | null = playing || t > 0 ? (track.cues.find((c) => t >= c.start && t <= c.end + 0.35) ?? null) : null;
  const progress = Math.min(1, t / track.duration);
  const label = mode === "before" ? "Hear the problem" : "Hear the difference";

  return (
    <section data-sc-act="problem" aria-labelledby="problem-title" className="scene-dark on-night join-next pt-[clamp(9rem,18vh,13rem)] pb-[clamp(4rem,9vh,7rem)]">
      <div className="wrap text-center">
        <h2 id="problem-title" className="headline mx-auto max-w-[16ch]">
          A document can look right and still be hard to use.
        </h2>
        <p className="lede mx-auto mt-6 !max-w-[46ch]">
          People who are blind or have low vision often use a screen reader, software that reads the page aloud. It only knows
          what a PDF&rsquo;s hidden structure tells it. Listen to the same permit form, as posted and after repair.
        </p>

        <Segmented
          className="mt-10"
          label="Version of the form"
          value={mode}
          onChange={choose}
          options={[
            { value: "before", label: "As posted" },
            { value: "after", label: "After repair" },
          ]}
        />
      </div>

      <div className="wrap mt-12">
        <div className="relative mx-auto max-w-[760px]">
          <PermitSheet layer={mode === "before" ? "broken" : "fixed"}>
            {Object.entries(regions).map(([id, r]) => (
              <rect
                key={id}
                x={r.x - 10}
                y={r.y - 10}
                width={r.w + 20}
                height={r.h + 20}
                rx="10"
                className={`${mode === "before" ? "hl" : "hl-fixed"} ${cue?.id === id ? "is-on" : ""}`}
              />
            ))}
          </PermitSheet>
          <SheetLegend layer={mode === "before" ? "broken" : "fixed"} className="text-moon" />
        </div>

        <div className="mx-auto mt-10 max-w-[760px]">
          <div className="player">
            <button type="button" onClick={toggle} aria-pressed={playing} className="player-btn">
              <span aria-hidden="true" data-icon={playing ? "pause" : "play"}></span>
              {playing ? "Pause" : label}
            </button>
            <div className="wave text-moon" aria-hidden="true">
              {reduced ? (
                <div className="h-1.5 w-full rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-moon" style={{ width: `${progress * 100}%` }} />
                </div>
              ) : (
                levels.map((l, i) => <span key={i} className={i / BARS <= progress ? "on" : ""} style={{ height: `${Math.round(l * 100)}%` }} />)
              )}
            </div>
            <button type="button" onClick={replay} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-white/10">
              <span className="sr-only">Play from the start</span>
              <span aria-hidden="true" data-icon="replay"></span>
            </button>
          </div>
          <p className="caption-line mt-7 text-center" aria-hidden="true">
            {cue ? <>&ldquo;{cue.text}&rdquo;</> : <span className="text-moon-muted">Press play. The spoken element lights up on the form.</span>}
          </p>
          <details className="mx-auto mt-6 max-w-[560px] text-center">
            <summary className="link-quiet cursor-pointer">Read both transcripts</summary>
            <div className="mt-4 grid gap-8 text-left sm:grid-cols-2">
              {(["before", "after"] as const).map((m) => (
                <div key={m}>
                  <h3 className="font-[600]">{m === "before" ? "As posted" : "After repair"}</h3>
                  <ol className="mt-2 space-y-1.5 text-[0.95rem] text-moon-muted" aria-label={m === "before" ? "Transcript, as posted" : "Transcript, after repair"}>
                    {data[m].cues.map((c, i) => (
                      <li key={c.id + i}>&ldquo;{c.text}&rdquo;</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </details>
          <p className="mx-auto mt-8 max-w-[56ch] text-center text-[0.88rem] text-moon-muted">
            Illustrative narration made with Kokoro, an open-source text-to-speech model. It is not a recording of VoiceOver, NVDA or any screen
            reader, and the form is a sample, not a customer document.
          </p>
          <audio ref={audio} src={track.src} preload="none" />
        </div>
      </div>
    </section>
  );
}
