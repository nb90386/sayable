"use client";

import { m, motionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import cues from "@/content/audio-cues.json";
import { geometry, type Geo } from "./geometry";
import { P, StageVisual } from "./StageVisual";

const RM = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(RM);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const readReduced = () => window.matchMedia(RM).matches;

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
  { id: "problem", rail: "The problem", win: [P.b0, P.b1 - 0.02, P.bOut - 0.02, P.c0], at: 0.22, pos: "left", dark: true },
  { id: "scale", rail: "The scale", win: [P.c0 + 0.01, P.c0 + 0.04, P.c1 + 0.02, P.d0], at: 0.44, pos: "top", dark: true },
  { id: "sort", rail: "Priorities", win: [P.d0 + 0.01, P.d0 + 0.04, P.d1 + 0.01, P.e0], at: 0.61, pos: "top", dark: true },
  { id: "repair", rail: "The repair", win: [P.e0 + 0.01, P.e0 + 0.04, P.f0 - 0.02, P.f0], at: 0.8, pos: "right", dark: true },
  { id: "record", rail: "The record", win: [P.f0 + 0.02, P.f1 - 0.02, 0.995, 1], at: 0.95, pos: "left", dark: false },
];

const sceneAt = (v: number) => {
  let a = -1;
  SCENES.forEach((s, i) => {
    if (v >= s.win[0] - 0.005) a = i;
  });
  return v < P.b0 - 0.02 ? -1 : a;
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

/** A short narration of the form, played only when asked. */
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
      if (a.ended || a.currentTime >= a.duration - 0.05) a.currentTime = 0;
      void a.play();
    } else a.pause();
  };
  const secs = Math.round(data.duration);
  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <button type="button" onClick={toggle} className="listen-btn press" aria-pressed={playing}>
          <span aria-hidden="true" data-icon={playing ? "pause" : "play"} />
          {playing ? "Pause" : which === "before" ? "Hear a narration, as posted" : "Hear a narration, repaired"}
          <span className="font-[400] opacity-70">{secs} s</span>
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
        <p>An illustrative narration of what a screen reader would announce, not a recording of one.</p>
      </details>
    </div>
  );
}

function Availability({ children }: { children: React.ReactNode }) {
  return <p className="avail">{children}</p>;
}

/** The words for each scene. Real headings and paragraphs, in reading order. */
function SceneCopy({ i, active }: { i: number; active: boolean }) {
  switch (SCENES[i]!.id) {
    case "problem":
      return (
        <>
          <h2 className="scene-title">It looks fine. It doesn&rsquo;t read.</h2>
          <p className="scene-body">
            This permit form has no tags and seven fields with no name. A screen reader starts at the footer, then says &ldquo;edit text, blank&rdquo; and
            moves on.
          </p>
          <Listen which="before" active={active} />
          <Availability>
            <Link href="/check" className="text-link">
              Check one of your PDFs free
            </Link>
            , in your browser. The file is never uploaded.
          </Availability>
        </>
      );
    case "scale":
      return (
        <>
          <h2 className="scene-title">Your city has thousands more like it.</h2>
          <p className="scene-body">Agendas, permits, budgets and notices, years of them, all linked from your website. Nobody has time to check them one at a time.</p>
        </>
      );
    case "sort":
      return (
        <>
          <h2 className="scene-title">Start with the documents residents need.</h2>
          <p className="scene-body">
            We list every PDF your site links to and sort them by how people use them. Some archived files may be excepted. Your team decides.
          </p>
          <Availability>
            <Link href="/readiness-audit" className="text-link">
              Readiness Audit
            </Link>
            : available now. <span className="md:hidden">The picture is an illustration, not real data.</span>
          </Availability>
        </>
      );
    case "repair":
      return (
        <>
          <h2 className="scene-title">Repaired by people, one page at a time.</h2>
          <p className="scene-body">
            Fields get the names printed beside them, the reading order follows the page, and the title becomes a heading. Software we are still testing drafts
            routine fixes. A person checks every one.
          </p>
          <Listen which="after" active={active} />
          <Availability>
            <Link href="/product" className="text-link">
              PDF repair
            </Link>
            : a service, available now.
          </Availability>
        </>
      );
    default:
      return (
        <>
          <h2 className="scene-title">With a record you can check yourself.</h2>
          <p className="scene-body">
            Every file comes back with a report: what was wrong, what changed, and the free tools you can use to re-check it. It is a record of the work, not a
            legal certificate.
          </p>
          <Availability>
            <Link href="/verify" className="text-link">
              How we check the work
            </Link>
          </Availability>
        </>
      );
  }
}

function Hero() {
  return (
    <>
      <h1 id="hero-title" className="display hero-title">
        Make your city&rsquo;s PDFs readable for everyone.
      </h1>
      <div className="hero-side">
        <p className="hero-lede">
          Sayable finds the PDFs on your website that screen readers can&rsquo;t read, fixes the ones residents need first, and gives you a record of every check.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href="/contact?topic=audit" className="btn">
            Request a Readiness Audit <span className="arrow" aria-hidden="true" data-icon="arrow-r" />
          </Link>
          <Link href="/check" className="btn btn-quiet">
            Check a PDF, free
          </Link>
        </div>
        <p className="mt-6 text-[0.9rem] text-muted">
          <a href="#deadline" className="hero-deadline">
            Federal deadline for cities of 50,000 or more: April 26, 2027
          </a>
        </p>
      </div>
    </>
  );
}

function GroupLabels({ p, geo }: { p: MotionValue<number>; geo: Geo }) {
  const o = useTransform(p, [P.d0 + 0.05, P.d1 - 0.03, P.e0 + 0.01, P.e0 + 0.04], [0, 1, 1, 0]);
  return (
    <m.div aria-hidden="true" className="absolute inset-0" style={{ opacity: o }}>
      {geo.groups.map((g) => (
        <div key={g.key} className="group-label" data-tone={g.tone} style={{ left: g.x, top: g.y - 2, width: g.w }}>
          <span className="group-title">{g.title}</span>
          <span className="group-note">{g.note}</span>
        </div>
      ))}
      <p className="group-caption" style={{ right: geo.region.x, top: geo.narrow ? geo.region.y - 1 : geo.region.y - 28 }}>
        Illustration, not real data
      </p>
    </m.div>
  );
}

/**
 * The homepage story. One document, one pinned stage: it starts as the hero,
 * shows what a screen reader meets, multiplies into the archive, sorts itself,
 * comes back repaired, and hands over its report. Scroll is the only control;
 * the rail lets anyone jump, and reduced motion gets the same scenes as still figures.
 */
export function Story() {
  // The server cannot know the preference, so it renders the moving version and the still one swaps in after hydration.
  const reduced = useSyncExternalStore(subscribeReduced, readReduced, () => false);
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
  const geo = useMemo(() => (size ? geometry(size.W, size.H, false, heroBottom) : null), [size, heroBottom]);
  const { scrollYProgress: p } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [active, setActive] = useState(-1);

  const bg = useTransform(p, [0.05, 0.09, P.f0 + 0.015, P.f0 + 0.045], ["#ecebe7", "#141310", "#141310", "#ecebe7"]);
  const heroO = useTransform(p, [0, P.aHold, P.aHold + 0.04], [1, 1, 0]);
  const heroY = useTransform(p, [0, P.aHold + 0.04], [0, -60]);
  const railO = useTransform(p, [P.b0 - 0.02, P.b0, 0.985, 1], [0, 1, 1, 0]);

  useMotionValueEvent(p, "change", (v) => {
    const a = sceneAt(v);
    setActive((prev) => (prev === a ? prev : a));
    const night = v > P.b0 - 0.01 && v < P.f0 + 0.02;
    const html = document.documentElement;
    if (night) html.dataset.hdr = "night";
    else if (html.dataset.hdr) delete html.dataset.hdr;
  });
  useEffect(() => () => void delete document.documentElement.dataset.hdr, []);

  const jump = useCallback(
    (i: number, instant = false) => {
      const el = track.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + SCENES[i]!.at * range, behavior: instant || reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  if (reduced) return <StoryStill />;

  return (
    <section ref={track} className="story" aria-labelledby="hero-title" data-sc-act="story">
      <m.div ref={stage} className="story-stage" style={{ backgroundColor: bg }}>
        <div className="story-grain" aria-hidden="true" />
        {geo ? (
          <StageVisual p={p} geo={geo}>
            <GroupLabels p={p} geo={geo} />
          </StageVisual>
        ) : null}

        <m.div ref={heroRef} className="hero-copy wrap" style={{ opacity: heroO, y: heroY }}>
          <Hero />
        </m.div>

        {SCENES.map((s, i) => (
          <SceneBlock key={s.id} i={i} p={p} active={active === i} onFocusOutOfView={() => active !== i && jump(i, true)} />
        ))}

        <m.nav aria-label="Story chapters" className="story-rail" style={{ opacity: railO }}>
          <ol>
            {SCENES.map((s, i) => (
              <li key={s.id}>
                <button type="button" aria-current={active === i ? "step" : undefined} onClick={() => jump(i)} data-dark={active >= 0 && SCENES[active]!.dark ? "" : undefined}>
                  <span className="rail-dot" aria-hidden="true" />
                  {s.rail}
                </button>
              </li>
            ))}
          </ol>
        </m.nav>
      </m.div>
    </section>
  );
}

function SceneBlock({ i, p, active, onFocusOutOfView }: { i: number; p: MotionValue<number>; active: boolean; onFocusOutOfView: () => void }) {
  const s = SCENES[i]!;
  const o = useTransform(p, s.win, [0, 1, 1, i === SCENES.length - 1 ? 1 : 0]);
  const y = useTransform(p, [s.win[0], s.win[1]], [18, 0]);
  return (
    <m.div
      className={`scene-copy ${s.dark ? "on-night" : ""}`}
      data-pos={s.pos}
      data-active={active ? "" : undefined}
      style={{ opacity: o, y }}
      onFocusCapture={onFocusOutOfView}
    >
      <SceneCopy i={i} active={active} />
    </m.div>
  );
}

/** Reduced motion: the same story as still figures, in reading order, with nothing moving. */
function StoryStill() {
  const box = useRef<HTMLDivElement>(null);
  const size = useStageSize(box);
  const geo = useMemo(() => (size ? geometry(size.W, size.H, true) : null), [size]);
  const values = useMemo(() => SCENES.map((s) => motionValue(s.at)), []);
  return (
    <section className="story-still" aria-labelledby="hero-title">
      <div className="wrap pt-[calc(var(--header-h)+3rem)]">
        <div className="hero-copy-still">
          <Hero />
        </div>
      </div>
      {SCENES.map((s, i) => (
        <div key={s.id} className={`still-scene ${s.dark ? "night on-night" : ""}`}>
          <div className="wrap grid gap-8 py-16 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center">
            <div className="scene-copy-still">
              <SceneCopy i={i} active />
            </div>
            <div ref={i === 0 ? box : undefined} className="still-figure">
              {geo ? <StageVisual p={values[i]!} geo={geo}>{s.id === "sort" ? <GroupLabels p={values[i]!} geo={geo} /> : null}</StageVisual> : null}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
