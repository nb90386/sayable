import { Close } from "@/components/home/Close";
import { Deadline } from "@/components/home/Deadline";
import { Difference } from "@/components/home/Difference";
import { Receive } from "@/components/home/Receive";
import { Resident } from "@/components/home/Resident";
import { Story } from "@/components/home/Story";
import { Workload } from "@/components/home/Workload";

/**
 * The homepage argument, in order: the city's form under the Sayable scan, with the federal date
 * and a live count above the headline; the resident who can't use the form; the scan's findings and
 * corrections; the form becomes the city's collection, sorted, repaired and recorded; what the city
 * receives; hear the difference; the work before the date and why it matters now; the honest
 * difference; the arithmetic; the one next step.
 */
export default function Home() {
  return (
    <>
      <Story />
      <Receive />
      <Resident />
      <Deadline />
      <Difference />
      <Workload />
      <Close />
    </>
  );
}
