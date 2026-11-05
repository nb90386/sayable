import { CostModel } from "@/components/sections/CostModel";
import { Audiences } from "@/components/sections/Audiences";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Inventory } from "@/components/sections/Inventory";
import { Lifecycle } from "@/components/sections/Lifecycle";
import { RepairBench } from "@/components/sections/RepairBench";
import { TwoReaders } from "@/components/sections/TwoReaders";
import { Verification } from "@/components/sections/Verification";

export default function Home() {
  return (
    <>
      <Hero />
      <TwoReaders />
      <Inventory />
      <Lifecycle />
      <RepairBench />
      <CostModel />
      <Verification />
      <Audiences />
      <FinalCta />
    </>
  );
}
