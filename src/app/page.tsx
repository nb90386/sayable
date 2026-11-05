import { Close } from "@/components/acts/Close";
import { Journey } from "@/components/acts/Journey";
import { Listen } from "@/components/acts/Listen";
import { Scale } from "@/components/acts/Scale";
import { Title } from "@/components/acts/Title";
import { Trust } from "@/components/acts/Trust";
import { Value } from "@/components/acts/Value";
import { Divider } from "@/components/split/Divider";

export default function Home() {
  return (
    <>
      <Divider />
      <Title />
      <Listen />
      <Scale />
      <Journey />
      <Value />
      <Trust />
      <Close />
    </>
  );
}
