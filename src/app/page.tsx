import { Conclusion } from "@/components/story/Conclusion";
import { Offer } from "@/components/story/Offer";
import { Opening } from "@/components/story/Opening";
import { Problem } from "@/components/story/Problem";
import { Product } from "@/components/story/Product";
import { Scale } from "@/components/story/Scale";
import { Trust } from "@/components/story/Trust";
import { Value } from "@/components/story/Value";

export default function Home() {
  return (
    <>
      <Opening />
      <Problem />
      <Scale />
      <Product />
      <Value />
      <Trust />
      <Offer />
      <Conclusion />
    </>
  );
}
