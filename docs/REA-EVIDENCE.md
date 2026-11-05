# REA investigation record (Nov 5 2026)

## Tool
- **Version:** Reverse Engineer Anything (`rea-agents@6.8.0`), run through `npx` as a CLI.
- **Node:** the package declares `^22.23.4 || ^24.22.1 || >=26.12.1`. This machine has 26.12.0. The commands used here ran without error, but the version is outside the declared range.
- **Setup not run:** `npx rea-agents setup` would register an MCP server in Claude Code's configuration, a change that needs the owner's approval. It was not run. REA's MCP tools are therefore not registered in this session; only its CLI was used.
- **Browser:** a local headless Chrome for Testing with `--remote-debugging-port=9333` on loopback. It loaded three public pages, and `rea list-browser-targets` plus `rea inspect-web-page` were run with `--observation-ms` 1500–2000.
- **Scope:** passive only. No script sources, storage or bodies were captured. No protections were bypassed and no private endpoints were touched.

## Observations (counts from REA's DOM and accessibility evidence)
| Page | svg / path | textPath | canvas | video | headings (a11y) | scripts |
|---|---|---|---|---|---|---|
| wisprflow.ai | 139 / 583 | 5 | 1 | 0 | 10 | 19 |
| apple.com/iphone (redirected from /iphone-17-pro/) | 121 / 107 | 0 | 0 | 0 | 41 | 45 |
| vercel.com | 48 / 55 | 0 | 1 | 0 | 2 | 180 |

## What this told us
- **Wispr Flow:** the signature flowing-text ribbon is built from SVG `textPath` elements, text laid along a path rather than video. That confirms an SVG path can carry the brand mechanism cheaply.
- **Wispr Flow:** the page has only 10 headings across 8 sections. Large sections are carried by illustration, not by text volume.
- **Apple:** the iPhone page is heading-dense (41 headings) and uses `<picture>` for every product image (35). Its hierarchy is explicit and its imagery responsive.
- **Vercel:** it ships 180 scripts but only 2 accessibility headings in this capture. Polish and semantics are separate concerns; we should not copy its heading economy.

## How Sayable differs
- **Its own mechanism.** Sayable's divider path is drawn with ordinary SVG path geometry. There is no `textPath`, and no text rides on the line, so it is not Wispr's ribbon. The line encodes reading order: it kinks where the order breaks and straightens act by act.
- **No product photography.** The documents are drawn in SVG from authored geometry.
- **Every act is a real section with its own heading**, following Apple's explicit hierarchy rather than Vercel's.
- **No code, assets or copy were taken from any inspected site.**
