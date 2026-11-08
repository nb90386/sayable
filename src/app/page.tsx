import { Close } from "@/components/home/Close";
import { Deadline } from "@/components/home/Deadline";
import { Difference } from "@/components/home/Difference";
import { Receive } from "@/components/home/Receive";
import { Story } from "@/components/home/Story";
import { Workload } from "@/components/home/Workload";

/**
 * The homepage is one story about one document: a reading line finds what goes
 * wrong, the form becomes the city's collection, the collection is sorted, one
 * file is repaired and recorded. Then what the city receives, the date, the
 * honest difference, the arithmetic, and the one next step.
 */
export default function Home() {
  return (
    <>
      <Story />
      <Receive />
      <Deadline />
      <Difference />
      <Workload />
      <Close />
    </>
  );
}
