import { Close } from "@/components/home/Close";
import { Deadline } from "@/components/home/Deadline";
import { Difference } from "@/components/home/Difference";
import { Story } from "@/components/home/Story";
import { Workload } from "@/components/home/Workload";

/**
 * The homepage is one story about one document: what goes wrong, how big the
 * problem is, how the work is ordered, repaired and recorded. Then the date,
 * the honest difference, the arithmetic, and the one next step.
 */
export default function Home() {
  return (
    <>
      <Story />
      <Deadline />
      <Difference />
      <Workload />
      <Close />
    </>
  );
}
