import { ReportMotif, OG_SIZE, ogImage } from "@/components/pages/og";

export const alt = "Sayable Readiness Audit: a sample report cover with a bar chart of findings.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({
    title: "Know which PDFs matter before you fix any of them.",
    sub: "A written inventory of every PDF on your public site, with a ranked list.",
    foot: "Readiness Audit · flat fee quoted in writing",
    motif: <ReportMotif />,
  });
}
