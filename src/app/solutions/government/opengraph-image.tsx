import { LanesMotif, OG_SIZE, ogImage } from "@/components/pages/og";

export const alt = "Sayable for cities: files sorted into lanes from needs review to completed review.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({
    title: "A resident can’t read your council agenda.",
    sub: "Sort the backlog before you repair it.",
    foot: "For cities, counties and districts",
    motif: <LanesMotif />,
  });
}
