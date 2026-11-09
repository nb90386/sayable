import { FindingsMotif, OG_SIZE, ogImage } from "@/components/pages/og";

export const alt = "Sayable services: a list of findings in a PDF, with the selected one open for review.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({
    title: "Find, fix and verify every public PDF.",
    sub: "Software finds and drafts. A person reviews. Every file is checked again.",
    foot: "Free PDF check · Readiness Audit · PDF repair",
    motif: <FindingsMotif />,
  });
}
