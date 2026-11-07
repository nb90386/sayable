# Motion system

Library: `motion` 14.9 (`motion/react`). Tokens live in `src/lib/motion.ts`; CSS-only presses live in `globals.css`.

| Token | Value | Used for |
|---|---|---|
| `EASE_OUT` | cubic-bezier(0.22, 1, 0.36, 1) | every entrance and settle |
| `EASE_MOVE` | cubic-bezier(0.65, 0, 0.35, 1) | knobs travelling between options |
| `DUR.ui` / `DUR.uiExit` | 200ms / 160ms (exit is 20% shorter) | dropdowns, mobile menu, consent banner, crossfades |
| `DUR.move` | 320ms | segmented knobs |
| `STAGGER` | 30ms | dropdown rows, mobile menu rows (capped at 10 rows) |
| `settleDelay(p)` | 12% of parent duration (~38ms) | labels and captions following a knob |
| `PRESS_SCALE` | 0.97 | `.btn` and `.press` on `:active`; 60ms in, 160ms back, no spring |
| `POPOVER_FROM` | 0.95 scale | nav popovers, consent dialog; origin at the trigger |

## Where it is used
- **Navigation**: one shared hover pill (`layoutId="nav-pill"`) moves between items; popovers grow from their trigger at 0.95 scale and exit back toward it; the chevron rotates.
- **Segmented controls** (`components/motion/Segmented.tsx`, homepage "As posted / After repair", product stage tabs): one shared knob (`layoutId`) travels on a shallow `arc()` path and stretches 12% along its direction at mid-travel, then settles. Labels crossfade colour a beat later.
- **Stage description**: old and new lines overlap in one grid cell (`AnimatePresence`, no `mode="wait"`), with a 2px blur on entry.
- **Success**: the consent "Save choices" button gives one 1.035 pulse after the choice is stored. The contact form shows success only after the server confirms.
- **Story scenes** (hero scan, inventory sort, estimator figures) keep their existing scroll and CSS choreography.

- Check a PDF: state changes (working, error, results) cross over under `AnimatePresence mode="popLayout"` with `tUi` in and `tUiExit` out; finding rows enter with the 30 ms stagger after an 80 ms settle; the progress bar scales with real page progress, linear 160 ms, never faked.

## Reduced motion
Every Motion component reads `useReducedMotion()`: knobs jump, popovers fade only, staggers drop to zero, and the hero becomes a static, fully revealed document.

## Exceptions
- The workload estimator uses native range inputs for keyboard and screen-reader support, so it has no custom rubber-band drag. A custom draggable knob was not worth the accessibility risk in this sprint.
- The switch in the consent dialog is CSS: its thumb stretches while pressed, which is the same idea in a native checkbox.
