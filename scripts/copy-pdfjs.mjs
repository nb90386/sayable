// Refresh the self-hosted pdf.js worker and data files after upgrading pdfjs-dist.
import { cpSync, mkdirSync } from "node:fs";
const src = "node_modules/pdfjs-dist";
mkdirSync("public/pdfjs", { recursive: true });
cpSync(`${src}/build/pdf.worker.min.mjs`, "public/pdfjs/pdf.worker.min.mjs");
cpSync(`${src}/cmaps`, "public/pdfjs/cmaps", { recursive: true });
cpSync(`${src}/standard_fonts`, "public/pdfjs/standard_fonts", { recursive: true });
console.log("pdf.js assets copied to public/pdfjs");
