import { Compare } from "@/components/story/Compare";
import { Conclusion } from "@/components/story/Conclusion";
import { Consequences } from "@/components/story/Consequences";
import { Offer } from "@/components/story/Offer";
import { Opening } from "@/components/story/Opening";
import { Problem } from "@/components/story/Problem";
import { Product } from "@/components/story/Product";
import { Scale } from "@/components/story/Scale";
import { Trust } from "@/components/story/Trust";
import { Value } from "@/components/story/Value";
import { WhyNow } from "@/components/story/WhyNow";

/**
 * The homepage answers a buyer's questions in order: what is this, what goes
 * wrong, when must we act, what does it cost us, how does it work, why not do
 * it ourselves, what will it take, can we trust it, what do we get.
 */
export default function Home() {
  return (
    <>
      <Opening />
      <Problem />
      <WhyNow />
      <Consequences />
      <Scale />
      <Product />
      <Compare />
      <Value />
      <Trust />
      <Offer />
      <Conclusion />
    </>
  );
}
