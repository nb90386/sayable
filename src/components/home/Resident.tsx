"use client";

import { m } from "motion/react";
import { useRef, useState } from "react";
import { BrokenLayer, FixedLayer, PermitSheet } from "@/components/doc/PermitSheet";
import { regions } from "@/components/doc/permit";
import { Segmented } from "@/components/motion/Segmented";
import cues from "@/content/audio-cues.json";
import { track } from "@/lib/analytics";
import { EASE_OUT } from "@/lib/motion";

type Mode = "before" | "after";

/** Why each announcement matters, in plain words. Only the lines that change are explained. */
const WHY: Record<Mode, Record<string, string>> = {
  before: {
    footer: "It starts at the bottom of the page. The reading order was never set.",
    title: "Read as plain text, so it can’t be found by jumping between headings.",
    name: "“Applicant name” is printed beside the box but not attached to it. The box has no name.",
    phone: "Another box with no name.",
    address: "And another. Which box is the address?",
    work: "Three boxes with no names and no question. Which one is “Repair”?",
    signature: "The signature box has no name either. The date field is never reached.",
  },
  after: {
    title: "Announced as a heading, so it can be found and jumped to.",
    name: "The box says what it is for, and that it is required.",
    phone: "Named.",
    address: "Named and marked required.",
    work: "The question is read first, then each option by name.",
    signature: "Named, and the date field follows.",
    date: "Reached, in the order the page shows.",
  },
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * The human side of the problem: one resident, one form, and what their screen reader announces.
 * The narration is an illustration made with a text-to-speech voice, never presented as a recording
 * of real assistive technology. Nothing plays until asked; every word is also on screen.
 */
export function Resident() {
  const [mode, setMode] = useState<Mode>("before");
  const data = cues[mode];
  const audio = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused" | "error">("idle");
  const [t, setT] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [xray, setXray] = useState(false);

  const playing = state === "playing" || state === "loading";
  const cueAtT = data.cues.find((c) => t >= c.start - 0.05 && t < c.end + 0.3);
  const currentId = playing || t > 0 ? (cueAtT?.id ?? null) : picked;
  const current = data.cues.find((c) => c.id === currentId);
  const r = currentId ? regions[currentId] : null;
  const problem = mode === "before" && currentId !== null && currentId !== "intro";

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      if (a.ended || (a.duration && a.currentTime >= a.duration - 0.05)) a.currentTime = 0;
      setState("loading");
      track("demo_play", { item: mode });
      a.play().catch(() => setState("error"));
    } else a.pause();
  };
  const seekTo = (s: number) => {
    const a = audio.current;
    setT(s);
    if (a) a.currentTime = s;
  };
  const pick = (id: string, start: number) => {
    setPicked(id);
    seekTo(start);
  };

  return (
    <section className="res" aria-labelledby="res-title" data-sc-act="resident">
      <div className="wrap">
        <div className="res-head">
          <h2 id="res-title" className="res-title">
            People should be able to use public documents on their own.
          </h2>
          <p className="res-intro">
            A resident who is blind needs a permit to build a ramp to their front door. They open the city&rsquo;s application with a screen reader, which reads
            the page aloud. To a sighted visitor the form looks fine. Here is what the resident hears.
          </p>
        </div>

        <div className="res-grid">
          <div className="res-figure">
            <PermitSheet className="res-sheet" label="Sample residential permit application from a fictional city">
              {xray ? <g className="res-xray">{mode === "before" ? <BrokenLayer plain /> : <FixedLayer />}</g> : null}
              {r ? (
                <m.rect
                  aria-hidden="true"
                  initial={false}
                  animate={{ x: r.x - 10, y: r.y - 10, width: r.w + 20, height: r.h + 20 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  rx="10"
                  className="res-focus"
                  data-tone={problem ? "problem" : mode === "after" ? "fixed" : "plain"}
                />
              ) : null}
            </PermitSheet>
            <div className="res-figure-foot">
              <button type="button" className="res-xray-btn press" aria-pressed={xray} onClick={() => setXray((v) => !v)}>
                <span aria-hidden="true" className="res-xray-box" />
                Show the structure a screen reader gets
              </button>
              <p className="res-caption">Sample form for the fictional City of Alder Creek.</p>
            </div>
          </div>

          <div className="res-panel">
            <Segmented
              label="Which version of the form to hear"
              options={[
                { value: "before", label: "As posted" },
                { value: "after", label: "After repair" },
              ]}
              value={mode}
              onChange={(v) => {
                // Switching versions stops the clip and starts the new one from the top.
                audio.current?.pause();
                setT(0);
                setPicked(null);
                setState("idle");
                setMode(v);
              }}
              className="res-seg"
            />

            <div className="res-player">
              <button type="button" onClick={toggle} className="listen-btn press" aria-label={playing ? "Pause narration" : `Play narration, ${mode === "before" ? "as posted" : "after repair"}`}>
                <span aria-hidden="true" data-icon={playing ? "pause" : "play"} />
                <span aria-hidden="true">{state === "loading" ? "Loading" : playing ? "Pause" : t > 0 ? "Resume" : "Listen"}</span>
              </button>
              <input
                type="range"
                className="res-seek"
                min={0}
                max={data.duration}
                step={0.1}
                value={Math.min(t, data.duration)}
                onChange={(e) => seekTo(Number(e.target.value))}
                aria-label="Narration position"
                aria-valuetext={`${fmt(t)} of ${fmt(data.duration)}`}
                style={{ "--p": `${(Math.min(t, data.duration) / data.duration) * 100}%` } as React.CSSProperties}
              />
              <span className="res-time" aria-hidden="true">
                {fmt(t)} / {fmt(data.duration)}
              </span>
              <button type="button" className="res-replay press" onClick={() => { seekTo(0); if (audio.current?.paused) toggle(); }} aria-label="Replay from the start">
                <span aria-hidden="true" data-icon="replay" />
              </button>
              <audio
                key={data.src}
                ref={audio}
                src={data.src}
                preload="none"
                onPlaying={() => setState("playing")}
                onWaiting={() => setState("loading")}
                onPause={() => setState((s) => (s === "error" ? s : "paused"))}
                onEnded={() => setState("paused")}
                onError={() => setState("error")}
                onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
              />
            </div>
            {state === "error" ? (
              <p className="res-error" role="status">
                The audio couldn&rsquo;t load. Every word is written below.
              </p>
            ) : null}

            <p className="res-list-head" id="res-list-head">
              {mode === "before" ? "What the screen reader announces, as posted" : "What it announces after repair"}
            </p>
            <ol className="res-list" aria-labelledby="res-list-head">
              {data.cues.map((c) => {
                const why = WHY[mode][c.id];
                const on = c.id === currentId;
                return (
                  <li key={c.id} data-on={on ? "" : undefined} data-tone={mode === "before" && why ? "problem" : mode === "after" && why ? "fixed" : undefined}>
                    <button type="button" onClick={() => pick(c.id, c.start)} aria-current={on ? "true" : undefined}>
                      <span className="res-said">&ldquo;{c.text}&rdquo;</span>
                      {why ? <span className="res-why">{why}</span> : null}
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="res-note">
              An illustrative narration made with a text-to-speech voice, not a recording of a screen reader. Real screen readers word things a little
              differently. {current ? null : "Choose a line to see where it is on the form."}
            </p>
          </div>
        </div>

        <p className="res-next">
          Each of these is a problem in the file&rsquo;s structure, not in how it looks. Sayable checks for exactly these. Scroll on to watch it scan the same form.
        </p>
      </div>
    </section>
  );
}
