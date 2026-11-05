import { AuditOffer } from "@/components/sections/AuditOffer";
import { CostModel } from "@/components/sections/CostModel";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Inventory } from "@/components/sections/Inventory";
import { Lifecycle } from "@/components/sections/Lifecycle";
import { TwoReaders } from "@/components/sections/TwoReaders";
import { Verification } from "@/components/sections/Verification";

export default function Home() {
  return (
    <>
      <Hero />
      <TwoReaders />
      <Inventory />
      <Lifecycle />
      <CostModel />
      <Verification />
      <AuditOffer />
      <FinalCta />
    </>
  );
}
