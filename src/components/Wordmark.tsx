/**
 * Sayable wordmark: the name set in the editorial serif, preceded by a mark of
 * two offset sheets — the visible page and the structure layer behind it.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true" className="shrink-0">
        <rect x="6.5" y="0.75" width="14.75" height="19" rx="1" fill="none" stroke="var(--color-signal)" strokeWidth="1.5" />
        <rect x="0.75" y="6.25" width="14.75" height="19" rx="1" fill="currentColor" />
        <path d="M4 12.5h8M4 16h5.5M4 19.5h7" stroke="var(--color-paper)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="18.25" cy="4.25" r="1.6" fill="var(--color-signal)" />
      </svg>
      <span
        className="font-serif text-[1.45rem] leading-none tracking-[-0.03em]"
        style={{ fontWeight: 460, fontVariationSettings: '"opsz" 36' }}
      >
        Sayable
      </span>
    </span>
  );
}
