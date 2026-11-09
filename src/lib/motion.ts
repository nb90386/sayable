import { arc, type Transition } from "motion/react";

/**
 * Sayable motion tokens. One vocabulary for every animated control.
 * See MOTION-SYSTEM.md for the reasoning and the exceptions.
 */

/** Ease-out for anything entering or settling. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Ease-in-out for objects that travel between two resting places. */
export const EASE_MOVE = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  /** Menus, dropdowns, popovers, small surfaces. */
  ui: 0.22,
  /** Exits are about 30% shorter than entrances (matches --dur-enter / --dur-exit in CSS). */
  uiExit: 0.15,
  /** Indicators and knobs travelling between options. */
  move: 0.32,
  /** Story-level reveals (hero, demos). */
  story: 0.7,
} as const;

/** Row stagger for lists, in seconds. */
export const STAGGER = 0.03;
/** Supporting details follow the main object by ~12% of its duration. */
export const settleDelay = (parent: number) => +(parent * 0.12).toFixed(3);

export const PRESS_SCALE = 0.97;
export const POPOVER_FROM = 0.97;

export const tUi: Transition = { duration: DUR.ui, ease: EASE_OUT };
export const tUiExit: Transition = { duration: DUR.uiExit, ease: EASE_OUT };

/**
 * Shared-layout indicator transition: the knob travels along a shallow arc
 * and stretches ~12% along its path at the midpoint, then settles.
 * Module-scope arc so its continuity survives re-renders.
 */
const knobArc = arc({ strength: 0.08 });
export const tKnob: Transition = {
  layout: { duration: DUR.move, ease: EASE_MOVE, path: knobArc },
};
export const KNOB_STRETCH = { scaleX: [1, 1.12, 1] };
export const tStretch: Transition = { duration: DUR.move, ease: EASE_MOVE, times: [0, 0.5, 1] };

/** Popover entrance from its trigger; exit returns toward it. */
export const popover = {
  initial: { opacity: 0, scale: POPOVER_FROM, y: -4 },
  animate: { opacity: 1, scale: 1, y: 0, transition: tUi },
  exit: { opacity: 0, scale: POPOVER_FROM, y: -4, transition: tUiExit },
};

/** Restrained success pulse: one beat, then rest. */
export const successPulse = {
  scale: [1, 1.035, 1],
  transition: { duration: 0.36, ease: EASE_OUT, times: [0, 0.4, 1] },
};
