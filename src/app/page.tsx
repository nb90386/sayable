import { Close } from "@/components/home/Close";
import { Deadline } from "@/components/home/Deadline";
import { DeadlineHero } from "@/components/home/DeadlineHero";
import { Difference } from "@/components/home/Difference";
import { Receive } from "@/components/home/Receive";
import { Resident } from "@/components/home/Resident";
import { Story } from "@/components/home/Story";
import { Workload } from "@/components/home/Workload";

/**
 * The homepage argument, in order: the federal date and a live count to it; one resident and
 * one form a screen reader can't make sense of; Sayable scanning that form, which becomes the
 * city's collection, sorted, repaired and recorded; what the city receives; the work before the
 * date and why it matters now; the honest difference; the arithmetic; the one next step.
 */
export default function Home() {
  return (
    <>
      <DeadlineHero />
      <Resident />
      <Story />
      <Receive />
      <Deadline />
      <Difference />
      <Workload />
      <Close />
    </>
  );
}
