import { OG_SIZE, ScanMotif, ogImage } from "@/components/pages/og";

export const alt = "Sayable: a sample city permit form with the Sayable scan line partway down, problems marked above it as corrected.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({
    title: "Make your city\u2019s PDFs accessible. Know what to fix first.",
    sub: "Find the problems in your public PDFs, repair what residents need, and keep a record of every check.",
    foot: "Free PDF check · Readiness Audit · PDF repair",
    motif: <ScanMotif />,
  });
}
