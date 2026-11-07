import type { CSSProperties, ReactNode } from "react";
import "@/app/pages-extra.css";

export type Who = "software" | "person";
export type Status = { label: string; state: "now" | "soon" | "planned" };

/** Stagger index for CSS reveals (30ms steps). */
export const n = (i: number) => ({ "--n": i }) as CSSProperties;

export function StatusChips({ items }: { items: Status[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Availability">
      {items.map((s) => (
        <li key={s.label} className="hx-status" data-state={s.state === "now" ? "now" : "soon"}>
          {s.label}
        </li>
      ))}
    </ul>
  );
}

/** Stage heading block: number (order is content here), name and availability. */
export function StageLabel({ num, name, status }: { num: number; name: string; status: Status[] }) {
  return (
    <div>
      <p className="flex items-baseline gap-3">
        <span aria-hidden="true" className="numeral text-[length:var(--step-3)] leading-none text-signal">
          {num}
        </span>
        <span className="title text-[length:var(--step-2)]">
          <span className="sr-only">Stage {num}: </span>
          {name}
        </span>
      </p>
      <div className="mt-4">
        <StatusChips items={status} />
      </div>
    </div>
  );
}

/** What the city provides, what Sayable returns, and who does the work. */
export function StageFacts({
  provide,
  returns,
  who,
  whoNote,
}: {
  provide: ReactNode;
  returns: ReactNode;
  who: Who[];
  whoNote: string;
}) {
  return (
    <dl className="grid gap-x-8 gap-y-5 border-t pt-6 hairline sm:grid-cols-3">
      <div>
        <dt className="label text-[0.85rem] font-[600] text-muted">You provide</dt>
        <dd className="mt-1.5 text-[0.975rem] text-ink-soft">{provide}</dd>
      </div>
      <div>
        <dt className="label text-[0.85rem] font-[600] text-muted">Sayable returns</dt>
        <dd className="mt-1.5 text-[0.975rem] text-ink-soft">{returns}</dd>
      </div>
      <div>
        <dt className="label text-[0.85rem] font-[600] text-muted">Who does the work</dt>
        <dd className="mt-1.5 text-[0.975rem] text-ink-soft">
          <span className="mb-2 flex flex-wrap gap-1.5">
            {who.map((w) => (
              <span key={w} className="hx-mark" data-who={w}>
                {w === "software" ? "Software" : "Person"}
              </span>
            ))}
          </span>
          {whoNote}
        </dd>
      </div>
    </dl>
  );
}

export function Check({ n: i = 0 }: { n?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="tick h-5 w-5 flex-none text-signal" style={n(i)}>
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
      <path d="M5.5 10.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
