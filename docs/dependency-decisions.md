# Dependency decision record, 8 November 2026

The build ships the fewest runtime libraries that do the job. Design tools stay outside the browser bundle.

## Runtime dependencies (in the shipped site)

| Library | Why |
|---|---|
| Next.js 16.4.5, React 19.3 | The existing app. It is not converted to a static export. |
| Motion 14.9 (`motion/react`, LazyMotion) | The one scroll and animation controller. It already drives the story with `useScroll` and `useTransform` per frame, scrubbed and reversible, plus the menus, the estimator springs and the close. |
| React `<ViewTransition>` | Route transitions. Built into React 19.3, so there is no extra package. |
| `next/font/google` (Funnel Display, Funnel Sans) | Self-hosted fonts at build time. |
| Canvas 2D (browser API) | The city's collection and the scan particles. Over 100 sheets are drawn for the cost of one layer. |
| axe-core, Playwright | Test-time only (devDependencies). |

## Design skills and references (guidance only, nothing shipped)

| Tool | Status |
|---|---|
| Scroll Craft | Installed (`~/.claude/skills/scroll-craft`). Used for the page grammar (one pinned filmic act handing off to editorial acts), the signature move, dead-scroll checks and the frame-shoot harness. |
| Apple Design (emilkowalski) | Installed. Used for interruptible, scroll-scrubbed motion, physical depth, optical tracking, reduced motion and the header material. |
| Impeccable | Installed. The detector was run on the rendered homepage. Its coloured-glow findings were fixed; the nested-card finding was defended (paper documents drawn as documents). |
| Taste Skill | Installed (plugin 2.1.5). The `inspect.mjs` browser inspector was run at 1440 and 390 px. Findings are in the final report. |
| Hallmark | The installed SKILL.md matches upstream; 8 support files are behind recent upstream fixes. Its redesign anti-slop checks were used as a checklist: keep every link and test hook, no eyebrows, no invented metrics, `svh` hero. |
| UI UX Pro Max | Its data files (`typography.csv`, `colors.csv`) were read for font and palette candidates. Nothing was installed and nothing was adopted verbatim. |
| GSAP Skills | The ScrollTrigger and React guidance was read. GSAP was not installed (see below). |
| Vercel agent skills | `web-design-guidelines` and `react-view-transitions` are installed locally. The local view-transitions copy predates React 19.3 stable, so the Next 16.4 docs in `node_modules/next/dist/docs` were followed instead. |
| Transitions.dev | The free recipes were inspected live (see `docs/design-reference-study.md`): 250 ms open, 150 ms close, `cubic-bezier(0.22,1,0.36,1)`, 8 px and 3 px blur page moves. The site's tokens are already in that range. No Pro asset was used or bought. |
| REA (Reverse Engineer Anything) | **Not installed.** It installs as an MCP server through `npx rea-agents setup`, which changes the agent's global configuration. That needs the owner's approval. It also requires Node 26.12.1 or later, and this machine has 26.12.0. Ordinary browser inspection covered the behaviours we needed. |

## Rejected for this build

| Library | Reason |
|---|---|
| GSAP + ScrollTrigger | It is free for commercial use now, but a second scroll controller over the same stage would fight Motion for transform ownership. Motion's scrubbed transforms already give frame-exact choreography that reverses cleanly. We would revisit this only for SplitText-style type animation, which this design does not use. |
| Lenis | Smooth-scroll hijacking breaks native scroll restoration, find-in-page and assistive technology expectations, and it fixes no issue we can demonstrate. |
| React Three Fiber, Drei, React Postprocessing, OGL, ShaderGradient, 14islands Scroll Rig | No scene needs WebGL. The depth effect is a projected 2D canvas, cheaper on low-power devices. |
| shadcn/ui, Radix UI | The site's own accessible primitives (menus, disclosure, dialog for consent) already exist and pass the axe tests. Adding a second component system would duplicate them. |
| Magic UI, React Bits, Motion Primitives | Pre-made effects are the generic look the brief asks us to avoid. |
| AutoAnimate | Motion covers list and layout animation. |
| Sonner | There are no toasts. The form reports status inline in a live region. |
| Fontsource | `next/font` already self-hosts the fonts. |
| Storybook | Not worth the setup for a marketing site of this size. Playwright covers the components in context. |
