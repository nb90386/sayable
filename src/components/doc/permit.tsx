/**
 * The recurring artifact of the rebuild: a fictional city's residential permit
 * application, drawn in one 850×1100 space (US Letter at 100 dpi). Every element
 * the narration speaks has a named region so the page can highlight it.
 */

export const PVB = "0 0 850 1100";

export type Region = { x: number; y: number; w: number; h: number };

export const regions: Record<string, Region> = {
  seal: { x: 700, y: 52, w: 84, h: 84 },
  title: { x: 64, y: 118, w: 618, h: 64 },
  intro: { x: 64, y: 200, w: 520, h: 30 },
  name: { x: 64, y: 318, w: 722, h: 82 },
  phone: { x: 64, y: 418, w: 350, h: 82 },
  address: { x: 64, y: 552, w: 722, h: 82 },
  work: { x: 64, y: 652, w: 722, h: 82 },
  signature: { x: 64, y: 808, w: 460, h: 104 },
  date: { x: 560, y: 808, w: 226, h: 104 },
  footer: { x: 64, y: 1022, w: 722, h: 34 },
};

/** Reading order and the structure each element should carry once repaired. */
export const structure: { id: string; posted: string; fixed: string }[] = [
  { id: "title", posted: 'P "Residential permit application"', fixed: 'H1 "Residential Permit Application"' },
  { id: "intro", posted: 'P "Complete all sections…"', fixed: 'P "Complete all sections and sign below."' },
  { id: "name", posted: "Field · no name", fixed: 'Field "Applicant name" · required' },
  { id: "phone", posted: "Field · no name", fixed: 'Field "Daytime phone"' },
  { id: "address", posted: "Field · no name", fixed: 'Field "Site address" · required' },
  { id: "work", posted: "3 check boxes · no names", fixed: 'Group "Type of work" · 3 named boxes' },
  { id: "signature", posted: "Field · no name", fixed: 'Field "Applicant signature" · required' },
  { id: "date", posted: "(not reached)", fixed: 'Field "Date"' },
  { id: "footer", posted: 'P "Form BD-12 · Page 1 of 2", read first', fixed: "Artifact · skipped" },
];

const doc = "Georgia, 'Times New Roman', serif";
const ui = "Helvetica, Arial, sans-serif";

function Field({ x, y, w, label, h = 44 }: { x: number; y: number; w: number; label: string; h?: number }) {
  return (
    <g>
      <text x={x} y={y} fontFamily={ui} fontSize="15" fill="#4b4e53">
        {label}
      </text>
      <rect x={x} y={y + 12} width={w} height={h} rx="3" fill="#fff" stroke="#9a9da2" strokeWidth="1.4" />
    </g>
  );
}

export function PermitPage() {
  return (
    <g>
      <rect width="850" height="1100" fill="#ffffff" />
      <text x="64" y="72" fontFamily={ui} fontSize="13.5" fontWeight="700" letterSpacing="2.6" fill="#3a3d42">
        CITY OF ALDER CREEK · BUILDING DIVISION
      </text>
      <g transform="translate(742 94)" fill="none" stroke="#3a3d42" strokeWidth="1.5">
        <circle r="38" />
        <circle r="30" strokeDasharray="2 3" />
        <path d="M-14 10 L0 -16 L14 10 Z M-18 15 H18" />
      </g>
      <text x="64" y="166" fontFamily={doc} fontSize="46" fill="#121314" letterSpacing="-0.6">
        Residential Permit Application
      </text>
      <text x="64" y="222" fontFamily={ui} fontSize="17" fill="#3a3d42">
        Complete all sections and sign below.
      </text>
      <line x1="64" y1="256" x2="786" y2="256" stroke="#121314" strokeOpacity="0.5" />

      <text x="64" y="300" fontFamily={ui} fontSize="16" fontWeight="700" fill="#121314">
        1  Applicant
      </text>
      <Field x={64} y={340} w={722} label="Applicant name" />
      <Field x={64} y={440} w={350} label="Daytime phone" />

      <text x="64" y="534" fontFamily={ui} fontSize="16" fontWeight="700" fill="#121314">
        2  Project
      </text>
      <Field x={64} y={574} w={722} label="Site address" />
      <text x="64" y="674" fontFamily={ui} fontSize="15" fill="#4b4e53">
        Type of work
      </text>
      {[
        [64, "New construction"],
        [330, "Addition"],
        [560, "Repair"],
      ].map(([x, l]) => (
        <g key={l as string}>
          <rect x={x as number} y={694} width="26" height="26" rx="3" fill="#fff" stroke="#9a9da2" strokeWidth="1.4" />
          <text x={(x as number) + 40} y={713} fontFamily={ui} fontSize="16" fill="#121314">
            {l}
          </text>
        </g>
      ))}

      <text x="64" y="790" fontFamily={ui} fontSize="16" fontWeight="700" fill="#121314">
        3  Sign
      </text>
      <Field x={64} y={830} w={460} h={66} label="Applicant signature" />
      <Field x={560} y={830} w={226} h={66} label="Date" />

      <line x1="64" y1="1010" x2="786" y2="1010" stroke="#121314" strokeOpacity="0.2" />
      <text x="64" y="1042" fontFamily={ui} fontSize="13" fill="#5b5e63">
        Form BD-12 · Example document, fictional city
      </text>
      <text x="786" y="1042" fontFamily={ui} fontSize="13" fill="#5b5e63" textAnchor="end">
        Page 1 of 2
      </text>
    </g>
  );
}
