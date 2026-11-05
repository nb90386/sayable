"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import data from "@/content/audio-cues.json";
import { usePrefersReducedMotion } from "@/lib/useInView";
import { SplitAct } from "../split/SplitAct";
import { PVB, PermitPage, regions } from "../doc/permit";

type Side = "before" | "after";
type Cue = { id: string; text: string; start: number; end: number };

const BARS = 36;

function usePlayer(side: Side, onStart: (s: Side) => void) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [levels, setLevels] = useState<number[]>(() => Array(BARS).fill(0.2));

  // playback state and the live waveform, read from the element while it plays
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

  const toggle = useCallback(async () => {
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
    onStart(side);
    await a.play();
  }, [onStart, side]);

  const replay = useCallback(async () => {
    const a = audio.current;
    if (!a) return;
    a.currentTime = 0;
    if (a.paused) await toggle();
  }, [toggle]);

  const pause = useCallback(() => audio.current?.pause(), []);

  return [audio, { playing, t, levels, toggle, replay, pause }] as const;
}

type PlayerApi = ReturnType<typeof usePlayer>[1];

function activeCue(cues: Cue[], t: number, playing: boolean) {
  if (!playing && t === 0) return null;
  return cues.find((c) => t >= c.start && t <= c.end + 0.35) ?? null;
}

function Player({
  side,
  label,
  player,
  cues,
}: {
  side: Side;
  label: string;
  player: PlayerApi;
  cues: Cue[];
}) {
  const reduced = usePrefersReducedMotion();
  const total = data[side].duration;
  const progress = Math.min(1, player.t / total);
  const night = side === "after";
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={player.toggle}
          aria-pressed={player.playing}
          className={`player-btn ${night ? "bg-moon text-night" : "bg-ink text-paper"}`}
        >
          <span aria-hidden="true" data-icon={player.playing ? "pause" : "play"}></span>
          {player.playing ? "Pause" : label}
        </button>
        <button type="button" onClick={player.replay} className="link-quiet !min-h-11 text-[0.95rem]">
          Play from the start
        </button>
      </div>
      <div className={`mt-5 ${night ? "text-moon" : "text-ink"}`} aria-hidden="true">
        {reduced ? (
          <div className="h-1.5 w-full rounded-full bg-current/20">
            <div className="h-full rounded-full bg-current" style={{ width: `${progress * 100}%` }} />
          </div>
        ) : (
          <div className="wave">
            {player.levels.map((l, i) => (
              <i key={i} className={i / BARS <= progress ? "on" : ""} style={{ height: `${Math.round(l * 100)}%` }} />
            ))}
          </div>
        )}
        <p className="mono mt-2 text-[0.8rem] opacity-70">
          {player.t.toFixed(1)}s / {total.toFixed(1)}s · {cues.length} spoken elements
        </p>
      </div>
    </div>
  );
}

function Sheet({ side, active }: { side: Side; active: string | null }) {
  const fixed = side === "after";
  const labels: Record<string, string> = {
    title: "H1",
    name: 'Field "Applicant name"',
    phone: 'Field "Daytime phone"',
    address: 'Field "Site address"',
    work: 'Group "Type of work"',
    signature: 'Field "Applicant signature"',
    date: 'Field "Date"',
  };
  return (
    <svg viewBox={PVB} className="doc-sheet" aria-hidden="true">
      <PermitPage />
      {Object.entries(regions).map(([id, r]) => (
        <rect
          key={id}
          x={r.x - 8}
          y={r.y - 8}
          width={r.w + 16}
          height={r.h + 16}
          rx="8"
          className={`${fixed ? "hl-fixed" : "hl"} ${active === id ? "is-on" : ""}`}
        />
      ))}
      {fixed
        ? Object.entries(labels).map(([id, l]) => {
            const r = regions[id]!;
            const w = l.length * 9.4 + 26;
            return (
              <g key={id} transform={`translate(${r.x + r.w - w + 6} ${r.y - 20})`} className="tagchip">
                <rect width={w} height="28" rx="14" />
                <text x="12" y="19.5">
                  {l}
                </text>
              </g>
            );
          })
        : null}
    </svg>
  );
}

function Transcript({ cues, active, side }: { cues: Cue[]; active: string | null; side: Side }) {
  return (
    <ol className="mt-8 border-t" style={{ borderColor: side === "after" ? "var(--rule-night)" : "var(--rule)" }} aria-label={side === "before" ? "Transcript, as posted" : "Transcript, after repair"}>
      {cues.map((c, i) => (
        <li
          key={c.id + i}
          className={`spoken grid grid-cols-[2rem_1fr] gap-2 border-b px-2 py-2.5 text-[1rem] ${active === c.id ? "is-on" : ""}`}
          style={{ borderColor: side === "after" ? "var(--rule-night)" : "var(--rule)" }}
        >
          <span className="mono text-[0.8rem] opacity-60">{i + 1}</span>
          <span>“{c.text}”</span>
        </li>
      ))}
    </ol>
  );
}

export function Listen() {
  const [current, setCurrent] = useState<Side | null>(null);
  const [beforeRef, before] = usePlayer("before", setCurrent);
  const [afterRef, after] = usePlayer("after", setCurrent);

  // only one story speaks at a time
  useEffect(() => {
    if (current === "before") after.pause();
    if (current === "after") before.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const bCue = activeCue(data.before.cues, before.t, before.playing);
  const aCue = activeCue(data.after.cues, after.t, after.playing);

  return (
    <SplitAct
      act="listen"
      labelledBy="listen-title"
      className="scroll-mt-0"
      head={
        <h2 id="listen-title" className="split-head headline">
          <span className="pb-8">Same form.</span>
          <span className="pb-8">Two very different readings.</span>
        </h2>
      }
      left={
        <div>
          <p className="max-w-[38ch] text-ink-soft lg:ml-auto lg:text-right">
            As posted, the file has no field names and no heading. Press play and follow the highlight.
          </p>
          <div className="mt-6 lg:flex lg:justify-end">
            <Player side="before" label="Hear the problem" player={before} cues={data.before.cues} />
          </div>
          <div className="mt-10 lg:ml-auto lg:max-w-[28rem]">
            <Sheet side="before" active={bCue?.id ?? null} />
          </div>
          <Transcript cues={data.before.cues} active={bCue?.id ?? null} side="before" />
          <audio ref={beforeRef} src={data.before.src} preload="none" />
        </div>
      }
      right={
        <div>
          <p className="max-w-[38ch] text-moon-muted">
            After repair, the page looks the same. The structure underneath now has a heading, named fields and a
            sensible order.
          </p>
          <div className="mt-6">
            <Player side="after" label="Hear the difference" player={after} cues={data.after.cues} />
          </div>
          <div className="mt-10 lg:max-w-[28rem]">
            <Sheet side="after" active={aCue?.id ?? null} />
          </div>
          <Transcript cues={data.after.cues} active={aCue?.id ?? null} side="after" />
          <audio ref={afterRef} src={data.after.src} preload="none" />
          <p className="mt-8 max-w-[52ch] text-[0.88rem] leading-relaxed text-moon-muted">
            Illustrative narration generated with macOS text-to-speech. It is not a recording of VoiceOver, NVDA or any
            screen reader, and the form is a sample, not a customer document.
          </p>
        </div>
      }
    />
  );
}
