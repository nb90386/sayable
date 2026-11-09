import "@/app/pages-extra.css";

type Stage = { name: string; d: string; who: string; now: boolean; status: string };

/** The five stages as one rail. A filled node is available now; a hollow one is pilot or planned. */
export function Workflow({ stages, label }: { stages: Stage[]; label: string }) {
  return (
    <ol className="wf" aria-label={label}>
      {stages.map((s) => (
        <li key={s.name} data-now={s.now ? "" : undefined}>
          <span className="wf-node" aria-hidden="true" />
          <h3 className="sp-h3">{s.name}</h3>
          <p className="wf-d">{s.d}</p>
          <p className="wf-who">{s.who}</p>
          <p className="hx-status" data-state={s.now ? "now" : "soon"}>{s.status}</p>
        </li>
      ))}
    </ol>
  );
}
