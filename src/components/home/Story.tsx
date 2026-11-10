"use client";

import { m, motionValue, useMotionTemplate, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import cues from "@/content/audio-cues.json";
import { track } from "@/lib/analytics";
import type { DeadlineKey } from "@/lib/deadline";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { PermitSheet } from "@/components/doc/PermitSheet";
import { regions } from "@/components/doc/permit";
import { DeadlineMark, RestNote, Signal } from "./DeadlineMark";
import { geometry, type Geo } from "./geometry";
import { PALETTES, PALETTE } from "./palette";
import { FINDINGS, P, StageVisual, scanFrom } from "./StageVisual";


const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Scene = {
  id: string;
  rail: string;
  /** progress window: fade in from [0] to [1], hold, fade out from [2] to [3] */
  win: [number, number, number, number];
  /** settled progress for jumps and static figures */
  at: number;
  pos: "left" | "top" | "right";
  dark: boolean;
};

const SCENES: Scene[] = [
  { id: "problem", rail: "The problem", win: [P.b0 + 0.02, P.b0 + 0.045, P.path1 + 0.005, P.c0 + 0.005], at: 0.2, pos: "top", dark: false },
  { id: "scale", rail: "The scale", win: [P.c1 - 0.02, P.c1 + 0.005, P.d0 - 0.015, P.d0 + 0.01], at: 0.41, pos: "top", dark: true },
  { id: "sort", rail: "Priorities", win: [P.d0 + 0.02, P.d0 + 0.05, P.e0 - 0.025, P.e0], at: 0.57, pos: "top", dark: true },
  { id: "repair", rail: "The repair", win: [P.e1 - 0.005, P.e1 + 0.02, P.fix1 - 0.005, P.fix1 + 0.012], at: 0.77, pos: "right", dark: false },
  { id: "record", rail: "The record", win: [P.f0 + 0.03, P.f1 - 0.01, 0.995, 1], at: 0.95, pos: "left", dark: false },
];

const sceneAt = (v: number) => {
  let a = -1;
  SCENES.forEach((s, i) => {
    if (v >= s.win[0] - 0.005) a = i;
  });
  return v < P.b0 ? -1 : a;
};

function useStageSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState<{ W: number; H: number } | null>(null);
  useIso(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => {
      const r = el.getBoundingClientRect();
      setSize((s) => (s && Math.abs(s.W - r.width) < 1 && Math.abs(s.H - r.height) < 40 ? s : { W: r.width, H: r.height }));
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

/** A short illustrative narration, played only when asked. */
function Listen({ which, active }: { which: "before" | "after"; active: boolean }) {
  const data = cues[which];
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active && audio.current && !audio.current.paused) audio.current.pause();
  }, [active]);
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      if (a.ended || (a.duration && a.currentTime >= a.duration - 0.05)) a.currentTime = 0;
      track("demo_play", { item: `story-${which}` });
      void a.play().catch(() => setPlaying(false));
    } else a.pause();
  };
  return (
    <div className="mt-5">
      <div className="flex items-center gap-3">
        <button type="button" onClick={toggle} className="listen-btn press" aria-pressed={playing}>
          <span aria-hidden="true" data-icon={playing ? "pause" : "play"} />
          {playing ? "Pause" : which === "before" ? "Hear it, as posted" : "Hear it, repaired"}
          <span className="font-[400] opacity-70">{Math.round(data.duration)} s</span>
        </button>
        <span aria-hidden="true" className="listen-bar">
          <span style={{ transform: `scaleX(${data.duration ? t / data.duration : 0})` }} />
        </span>
      </div>
      <audio
        ref={audio}
        src={data.src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
      />
      <details className="listen-transcript mt-3">
        <summary>Transcript</summary>
        <p>{data.cues.map((c) => c.text).join(" ")}</p>
        <p>An illustrative narration made with a text-to-speech voice, not a recording of a screen reader.</p>
      </details>
    </div>
  );
}

function Availability({ children }: { children: React.ReactNode }) {
  return <p className="avail">{children}</p>;
}

/** The words for each scene. Real headings and paragraphs, in reading order. */
function SceneCopy({ i, active, extra }: { i: number; active?: boolean; extra?: React.ReactNode }) {
  switch (SCENES[i]!.id) {
    case "problem":
      return (
        <>
          <h2 className="scene-title">A resident who is blind opens this form.</h2>
          <p className="scene-body scene-body-wide">
            Their screen reader reads it aloud. Where the page says Applicant name, it hears only &ldquo;Edit text. Blank.&rdquo; The scan finds four kinds of
            problem like this, and shows the correction a person makes.
          </p>
          {extra}
          <Listen which="before" active={!!active} />
          <details className="scene-details">
            <summary>Technical details</summary>
            <ol>
              {FINDINGS.map((f) => (
                <li key={f.id}>
                  {f.text} {f.fixText} Before, a screen reader says &ldquo;{f.heard}&rdquo; After: &ldquo;{f.heardFixed}&rdquo; <span>{f.detail}</span>
                </li>
              ))}
            </ol>
          </details>
          <Availability>
            <Link href="/check" className="text-link">
              Check one of your PDFs free
            </Link>
            . It runs in your browser and never uploads the file.
          </Availability>
        </>
      );
    case "scale":
      return (
        <>
          <h2 className="scene-title">Your city may have thousands of PDFs. Which need attention first?</h2>
          <p className="scene-body">Agendas, permits, notices and budgets, years of them, all linked from your website. A Readiness Audit lists them and shows which to fix first.</p>
          <p className="mt-5">
            <Link href="/contact?topic=audit" className="btn btn-night" onClick={() => track("audit_cta_click", { item: "story-scale" })}>
              Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r" />
            </Link>
          </p>
        </>
      );
    case "sort":
      return (
        <>
          <h2 className="scene-title">Start with the files residents use.</h2>
          <p className="scene-body">A Readiness Audit lists every PDF your site links to and sorts the work. Your team decides what counts as archived.</p>
          <Availability>
            <Link href="/readiness-audit" className="text-link">
              Readiness Audit
            </Link>
            , available now. The piles are an illustration, not real data.
          </Availability>
        </>
      );
    case "repair":
      return (
        <>
          <h2 className="scene-title">Then a person repairs them.</h2>
          <p className="scene-body">
            Fields get their names, the reading order follows the page, and the title becomes a heading. Software we are still testing drafts routine fixes. A
            person checks every one.
          </p>
          <Listen which="after" active={!!active} />
          <Availability>
            <Link href="/product" className="text-link">
              PDF repair
            </Link>
            , a service available now.
          </Availability>
        </>
      );
    default:
      return (
        <>
          <h2 className="scene-title">Every file comes back with its record.</h2>
          <p className="scene-body">What was wrong, what changed, how it was re-checked, and what we did not claim.</p>
          <Availability>
            <Link href="/verify" className="text-link">
              How we check the work
            </Link>
          </Availability>
        </>
      );
  }
}

function Hero({ which, setWhich }: { which: DeadlineKey; setWhich: (k: DeadlineKey) => void }) {
  return (
    <>
      <DeadlineMark which={which} setWhich={setWhich} />
      <h1 id="hero-title" className="hero-title">
        Find the PDFs that need fixing before your deadline.
      </h1>
      <p className="hero-lede">
        Sayable finds the accessibility problems in your city&rsquo;s public PDFs, puts the work in order, and has a person check every fix.
      </p>
      <div className="hero-actions">
        <Link href="/contact?topic=audit" className="btn" onClick={() => track("audit_cta_click", { item: "hero" })}>
          Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r" />
        </Link>
        <Link href="/how-it-works" className="btn btn-quiet">
          See how it works
        </Link>
      </div>
      <p className="hero-next">A 30-minute call, then a written quote. Nothing starts until you agree.</p>
      <a href="#receive" className="skip-story sr-only-focusable">
        Skip the scan story
      </a>
    </>
  );
}

/** The scan's findings so far, in plain words, numbered like the marks in the form's margin. Visual only; the same text is in the story's Technical details. */
function ScanLog({ p, narrow = false, className = "" }: { p: MotionValue<number>; narrow?: boolean; className?: string }) {
  const scan = useTransform(p, (v) => scanFrom(v, narrow));
  // 0 not reached, 1 found, 2 corrected; the first finding is visible before any scroll
  const states = (sv: number) => FINDINGS.map((f, i) => (sv >= f.fix ? 2 : i === 0 || sv >= f.at ? 1 : 0)).join("");
  const [st, setSt] = useState(() => states(0));
  useMotionValueEvent(scan, "change", (sv) => {
    const k = states(sv);
    setSt((prev) => (prev === k ? prev : k));
  });
  // the latest finding the scan has reached, found or corrected; it carries the "heard" line
  const current = Math.max(st.lastIndexOf("1"), st.lastIndexOf("2"));
  return (
    <div className={`scan-log ${className}`} aria-hidden="true" data-states={st}>
      <p className="scan-log-head">
        <span className="scan-log-dot" />
        Sayable scan
        <span className="scan-log-file">Sample form, fictional city. Scroll to scan.</span>
      </p>
      <ol>
        {FINDINGS.map((f, i) => {
          const v = st[i];
          return (
            <li key={f.id} data-found={v !== "0" ? "" : undefined} data-fixed={v === "2" ? "" : undefined} data-current={i === current ? "" : undefined}>
              <span className="scan-log-n">{i + 1}</span>
              <span className="scan-log-t">
                <span className="scan-log-problem">{f.text}</span>
                <span className="scan-log-fix">{f.fixText}</span>
                <span className="scan-log-heard">
                  <span>Heard</span> &ldquo;{v === "2" ? f.heardFixed : f.heard}&rdquo;
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Kinds of document, named on a few near cards while the collection fills the room. */
function KindTags({ p, geo }: { p: MotionValue<number>; geo: Geo }) {
  const o = useTransform(p, [P.c1 + 0.01, P.c1 + 0.035, P.d0 - 0.005, P.d0 + 0.02], [0, 1, 1, 0]);
  const vis = useTransform(o, (v) => (v > 0.01 ? "visible" : "hidden"));
  return (
    <m.div aria-hidden="true" className="absolute inset-0" style={{ opacity: o, visibility: vis }}>
      {geo.tags.map((t) => (
        <span key={t.kind} className="kind-tag" style={{ left: t.x, top: t.y }}>
          {t.label}
        </span>
      ))}
    </m.div>
  );
}

/** The four piles, named once they have formed. */
function StackLabels({ p, geo }: { p: MotionValue<number>; geo: Geo }) {
  const o = useTransform(p, [P.d1 - 0.04, P.d1, P.e0, P.e0 + 0.03], [0, 1, 1, 0]);
  const vis = useTransform(o, (v) => (v > 0.01 ? "visible" : "hidden"));
  return (
    <m.div aria-hidden="true" className="absolute inset-0" style={{ opacity: o, visibility: vis }}>
      {geo.stacks.map((g) => (
        <div key={g.key} className="stack-label" data-tone={g.tone} style={{ left: g.x, top: g.base + 12, width: g.w }}>
          <span className="stack-title">{g.title}</span>
          <span className="stack-note">{g.note}</span>
        </div>
      ))}
    </m.div>
  );
}

/**
 * The homepage story. One document, one pinned stage: it starts as the hero,
 * a reading line scans it and finds what a screen reader meets, it becomes one
 * card in the city's collection, the collection sorts itself into piles, the
 * form comes back and is repaired, and it hands over its record. Scroll is the
 * only control. Reduced motion gets the same scenes as still figures.
 */
export function Story() {
  // The server cannot know the preference, so it renders the moving version and the still one swaps in after hydration.
  const reduced = usePrefersReducedMotion();
  const pal = PALETTES[PALETTE];
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const size = useStageSize(stage);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroBottom, setHeroBottom] = useState(0);
  useIso(() => {
    const el = heroRef.current;
    if (!el) return;
    const set = () => setHeroBottom(Math.round(el.offsetTop + el.offsetHeight));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Only phones place the form under the measured hero copy; desktops ignore it, so it never re-lays the stage there.
  const hb = size && size.W < 900 ? heroBottom : 0;
  const geo = useMemo(() => (size ? geometry(size.W, size.H, false, hb) : null), [size, hb]);
  const { scrollYProgress: p } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [active, setActive] = useState(-1);
  const [which, setWhich] = useState<DeadlineKey>("large");
  // Where the resting form's top edge sits, so the deadline row can line up with the scan.
  const docVars = geo ? ({ "--doc-top": `${Math.round(geo.doc.a.y - (geo.docH * geo.doc.a.s) / 2)}px` } as React.CSSProperties) : undefined;

  // One room, changing light: day, dusk while the collection fills it, morning for the repair, day for the record.
  const lightStops = [0, P.c0 - 0.005, P.c1 - 0.025, P.e0 + 0.005, P.e1, P.f0, P.f1];
  const base = useTransform(p, lightStops, [pal.day.base, pal.day.base, pal.dusk.base, pal.dusk.base, pal.dawn.base, pal.dawn.base, pal.day.base]);
  const lit = useTransform(p, lightStops, [pal.day.lit, pal.day.lit, pal.dusk.lit, pal.dusk.lit, pal.dawn.lit, pal.dawn.lit, pal.day.lit]);
  const lx = useTransform(p, [0, P.aHold, P.b1, P.c1, P.d1, P.e1, P.f1], [72, 72, 64, 62, 60, 40, 50]);
  const ly = useTransform(p, [0, P.b1, P.c1, P.d1, P.e1], [62, 48, 48, 62, 48]);
  const bg = useMotionTemplate`radial-gradient(90% 85% at ${lx}% ${ly}%, ${lit} 0%, ${base} 70%)`;

  const heroY = useTransform(p, [P.aHold, P.b0 + 0.035], [0, -(heroBottom + 40)]);
  const heroO = useTransform(p, [P.b0 + 0.015, P.b0 + 0.035], [1, 0]);
  const heroVis = useTransform(heroO, (v) => (v > 0.01 ? "visible" : "hidden"));
  const cueO = useTransform(p, [0.018, 0.035], [1, 0]);
  const logO = useTransform(p, [P.b0 + 0.02, P.b0 + 0.035, P.path1 + 0.005, P.c0 + 0.005], [0, 1, 1, 0]);

  useMotionValueEvent(p, "change", (v) => {
    const a = sceneAt(v);
    setActive((prev) => (prev === a ? prev : a));
    const night = v > P.c0 + 0.045 && v < P.e0 + 0.035;
    const html = document.documentElement;
    if (night) html.dataset.hdr = "night";
    else if (html.dataset.hdr) delete html.dataset.hdr;
  });
  useEffect(() => () => void delete document.documentElement.dataset.hdr, []);

  const jumpTo = useCallback((at: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + at * range, behavior: "auto" });
  }, []);
  const jump = useCallback((i: number) => jumpTo(SCENES[i]!.at), [jumpTo]);

  if (reduced) return <StoryStill />;

  return (
    <section ref={track} className="story" aria-labelledby="hero-title" data-sc-act="story">
      <m.div ref={stage} className="story-stage" style={{ background: bg, ...docVars }}>
        {geo ? <Visual p={p} geo={geo} pal={pal} tag={<RestNote p={p} />} /> : null}
        {geo && !geo.narrow ? <Signal stage={stage} p={p} deps={`${geo.W}x${geo.H}-${which}`} /> : null}

        <m.div className="scan-log-wrap" style={{ opacity: logO }}>
          <ScanLog p={p} />
        </m.div>

        <m.div className="hero-cue" aria-hidden="true" style={{ opacity: cueO }}>
          <div className="wrap">
            <span className="hero-cue-sample">Sample form, fictional city</span>
            <span className="hero-cue-key">
              <i /> A problem a resident would hit
            </span>
            <span className="hero-cue-key" data-k="fixed">
              <i /> The correction
            </span>
            <span className="hero-cue-scroll">
              Scroll to run the scan <span data-icon="arrow-d" />
            </span>
          </div>
        </m.div>

        <m.div
          ref={heroRef}
          className="hero-copy wrap"
          style={{ opacity: heroO, y: heroY, visibility: heroVis }}
          onFocusCapture={() => {
            // keyboard focus inside the hero after it has scrolled away brings the story back to the start
            if (p.get() > P.b0 + 0.015) jumpTo(0);
          }}
        >
          <Hero which={which} setWhich={setWhich} />
        </m.div>

        {SCENES.map((s, i) => (
          <SceneBlock key={s.id} i={i} p={p} narrow={!!geo?.narrow} active={active === i} onFocusOutOfView={() => active !== i && jump(i)} />
        ))}
      </m.div>
    </section>
  );
}

/** The stage, memoised: scene changes and hero measurement re-render the copy, never the visual. */
const Visual = memo(function Visual({ p, geo, pal, tag }: { p: MotionValue<number>; geo: Geo; pal: (typeof PALETTES)[keyof typeof PALETTES]; tag?: React.ReactNode }) {
  return (
    <StageVisual p={p} geo={geo} pal={pal} docTag={tag}>
      <KindTags p={p} geo={geo} />
      <StackLabels p={p} geo={geo} />
    </StageVisual>
  );
});

function SceneBlock({
  i,
  p,
  narrow,
  active,
  onFocusOutOfView,
}: {
  i: number;
  p: MotionValue<number>;
  narrow: boolean;
  active: boolean;
  onFocusOutOfView: () => void;
}) {
  const s = SCENES[i]!;
  // On phones the form crosses the copy area on its way up, so the first words wait until it has settled.
  const win: Scene["win"] = narrow && s.id === "problem" ? [P.b1 - 0.02, P.b1 + 0.005, s.win[2], s.win[3]] : s.win;
  const o = useTransform(p, win, [0, 1, 1, i === SCENES.length - 1 ? 1 : 0]);
  const y = useTransform(p, [win[0], win[1]], [14, 0]);
  return (
    <m.div
      className={`scene-copy ${s.dark ? "on-night" : ""}`}
      data-pos={s.pos}
      data-active={active ? "" : undefined}
      style={{ opacity: o, y }}
      onFocusCapture={onFocusOutOfView}
    >
      <SceneCopy i={i} active={active} extra={s.id === "problem" ? <ScanLog p={p} narrow={narrow} className="scan-log-inline" /> : undefined} />
    </m.div>
  );
}

/** Reduced motion: the same story as still figures, in reading order, with nothing moving. */
function StoryStill() {
  const [which, setWhich] = useState<DeadlineKey>("large");
  const box = useRef<HTMLDivElement>(null);
  const size = useStageSize(box);
  const geo = useMemo(() => (size ? geometry(size.W, size.H, true) : null), [size]);
  const values = useMemo(() => SCENES.map((s) => motionValue(s.at)), []);
  const rest = useMemo(() => motionValue(0), []);
  return (
    <section className="story-still" aria-labelledby="hero-title" data-sc-act="story">
      <div className="wrap pt-[calc(var(--header-h)+3rem)]">
        <div className="hero-still-grid">
          <div className="hero-copy-still">
            <Hero which={which} setWhich={setWhich} />
          </div>
          <div className="hero-still-figure">
            <PermitSheet className="hero-still-sheet">
              <rect x={regions.title!.x - 8} y={regions.title!.y - 8} width={regions.title!.w + 16} height={regions.title!.h + 16} rx="6" fill="rgb(207 69 32 / 0.06)" stroke="#cf4520" strokeWidth="2.5" strokeDasharray="9 7" />
            </PermitSheet>
            <RestNote p={rest} />
          </div>
        </div>
      </div>
      {SCENES.map((s, i) => (
        <div key={s.id} className={`still-scene ${s.dark ? "still-dusk on-night" : ""}`}>
          <div className="wrap grid gap-8 py-16 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center">
            <div className="scene-copy-still">
              <SceneCopy i={i} active />
            </div>
            <div ref={i === 0 ? box : undefined} className="still-figure">
              {geo ? (
                <StageVisual p={values[i]!} geo={geo} pal={PALETTES[PALETTE]}>
                  {s.id === "sort" ? <StackLabels p={values[i]!} geo={geo} /> : null}
                </StageVisual>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
