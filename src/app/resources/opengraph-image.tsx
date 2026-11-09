import { GuidesMotif, OG_SIZE, ogImage } from "@/components/pages/og";

export const alt = "Sayable resources: three guide covers fanned out.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({
    title: "Guides for the people who run the website.",
    sub: "Plain-language writing on public PDFs and the ADA Title II web rule.",
    foot: "Not legal advice",
    motif: <GuidesMotif />,
  });
}
