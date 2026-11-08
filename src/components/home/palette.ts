/**
 * The story's light. The page is one room whose light changes: daylight on the
 * form, dusk while the city's collection fills the room, morning when the form
 * comes back repaired, daylight again for its record.
 *
 * `base` is the ground, `lit` the pool of light that follows the document.
 * Two other treatments (bright editorial, civic ink) were rendered and rejected;
 * see docs/font-audit/palette-3-treatments.jpg and FONT-AUDIT.md.
 */
export type Light = { base: string; lit: string };
export type Palette = {
  day: Light;
  dusk: Light;
  dawn: Light;
  /** paper colour of the city's documents, and their ink */
  sheet: [number, number, number];
  ink: [number, number, number];
  fix: string;
  check: string;
};

export const PALETTES = {
  /** Deep mineral: daylight to a green-slate dusk and back, never black. */
  mineral: {
    day: { base: "#e9e8e3", lit: "#f6f5f1" },
    dusk: { base: "#1f2b2a", lit: "#3a4a47" },
    dawn: { base: "#e7e2d7", lit: "#f8f4ec" },
    sheet: [238, 236, 229],
    ink: [30, 36, 35],
    fix: "#ff9468",
    check: "#8fd6b4",
  },
} satisfies Record<string, Palette>;

export type PaletteKey = keyof typeof PALETTES;
export const PALETTE: PaletteKey = "mineral";

export const rgb = (c: [number, number, number], a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
export const mix = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
export const hex = (h: string): [number, number, number] => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
