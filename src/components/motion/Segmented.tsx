"use client";

import { LayoutGroup, m, useReducedMotion } from "motion/react";
import { useId, useRef } from "react";
import { DUR, EASE_OUT, KNOB_STRETCH, settleDelay, tKnob, tStretch } from "@/lib/motion";

type Option<T extends string> = { value: T; label: string };

/**
 * A radio group drawn as a pill switch. One shared knob travels between options
 * (layoutId), stretching about 12% along its path, while the labels crossfade
 * colour a beat after the knob moves. Arrow keys move the selection.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className = "",
}: {
  options: readonly Option<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
}) {
  const id = useId();
  const reduced = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + options.length) % options.length;
    onChange(options[n]!.value);
    refs.current[n]?.focus();
  };
  return (
    <LayoutGroup id={id}>
      <div role="radiogroup" aria-label={label} className={`seg ${className}`}>
        {options.map((o, i) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => onChange(o.value)}
              onKeyDown={(e) => onKey(e, i)}
              className="seg-opt"
            >
              {on ? (
                <m.span
                  layoutId="knob"
                  aria-hidden="true"
                  className="seg-knob"
                  transition={reduced ? { duration: 0 } : tKnob}
                  animate={reduced ? undefined : KNOB_STRETCH}
                  key={`knob-${o.value}`}
                  style={{ originX: 0.5 }}
                  {...(reduced ? {} : { transition: { ...tKnob, scaleX: tStretch } })}
                />
              ) : null}
              <m.span
                className="relative"
                animate={{ opacity: on ? 1 : 0.78 }}
                transition={{ duration: DUR.ui, ease: EASE_OUT, delay: reduced ? 0 : settleDelay(DUR.move) }}
              >
                {o.label}
              </m.span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
