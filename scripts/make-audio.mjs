// Generates the illustrative narration for the permit-form demonstration.
// macOS text-to-speech (`say`), one segment per document element so the page can
// highlight exactly what is being spoken. This is NOT a screen-reader recording.
//   node scripts/make-audio.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const VOICE = process.env.SAYABLE_VOICE || "Samantha";
const RATE = process.env.SAYABLE_RATE || "185";
const GAP = 0.45; // seconds of silence between elements

export const scripts = {
  before: [
    { id: "footer", text: "Page 1 of 2." },
    { id: "title", text: "Residential permit application." },
    { id: "intro", text: "Complete all sections and sign below." },
    { id: "name", text: "Edit text. Blank." },
    { id: "phone", text: "Edit text. Blank." },
    { id: "address", text: "Edit text. Blank." },
    { id: "work", text: "Check box. Not checked. Check box. Not checked. Check box. Not checked." },
    { id: "signature", text: "Edit text. Blank." },
  ],
  after: [
    { id: "title", text: "Residential Permit Application. Heading level 1." },
    { id: "intro", text: "Complete all sections and sign below." },
    { id: "name", text: "Applicant name. Edit text. Required." },
    { id: "phone", text: "Daytime phone. Edit text." },
    { id: "address", text: "Site address. Edit text. Required." },
    { id: "work", text: "Type of work. New construction, check box, not checked. Addition, check box. Repair, check box." },
    { id: "signature", text: "Applicant signature. Edit text. Required." },
    { id: "date", text: "Date. Edit text." },
  ],
};

const tmp = mkdtempSync(path.join(process.env.TMPDIR || tmpdir(), "sayable-audio-"));
const outDir = path.resolve("public/audio");
mkdirSync(outDir, { recursive: true });
const dur = (f) => parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], { encoding: "utf8" }));

const silence = path.join(tmp, "gap.wav");
execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-f", "lavfi", "-i", `anullsrc=r=22050:cl=mono`, "-t", String(GAP), silence]);

const cues = {};
for (const [name, segs] of Object.entries(scripts)) {
  const parts = [];
  const list = [];
  let t = 0.25;
  // a short lead-in so the first word is never clipped
  const lead = path.join(tmp, `${name}-lead.wav`);
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-f", "lavfi", "-i", `anullsrc=r=22050:cl=mono`, "-t", "0.25", lead]);
  parts.push(lead);
  segs.forEach((s, i) => {
    const aiff = path.join(tmp, `${name}-${i}.aiff`);
    const wav = path.join(tmp, `${name}-${i}.wav`);
    execFileSync("say", ["-v", VOICE, "-r", RATE, "-o", aiff, s.text]);
    execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", aiff, "-ar", "22050", "-ac", "1", wav]);
    const d = dur(wav);
    list.push({ id: s.id, text: s.text, start: +t.toFixed(3), end: +(t + d).toFixed(3) });
    t += d + GAP;
    parts.push(wav, silence);
  });
  const concat = path.join(tmp, `${name}.txt`);
  writeFileSync(concat, parts.map((p) => `file '${p}'`).join("\n"));
  const out = path.join(outDir, `permit-${name}.m4a`);
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", concat, "-c:a", "aac", "-b:a", "64k", out]);
  cues[name] = { src: `/audio/permit-${name}.m4a`, duration: +dur(out).toFixed(3), cues: list };
  console.log(name, cues[name].duration + "s", list.length, "cues");
}
writeFileSync(
  path.resolve("src/content/audio-cues.json"),
  JSON.stringify({ voice: `macOS text-to-speech, voice "${VOICE}", rate ${RATE}`, generated: new Date().toISOString().slice(0, 10), ...cues }, null, 2),
);
