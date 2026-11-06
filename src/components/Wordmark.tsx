/**
 * Sayable wordmark: a document sheet with the reading path running through it,
 * set beside the name in the display face.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden="true" className="shrink-0">
        <rect x="1" y="1" width="20" height="26" rx="4" fill="currentColor" />
        <path d="M5 7.5c5 0 9 1.5 9 4.5s-8 2.5-8 6 4 4 10 4" fill="none" stroke="var(--wm-path, var(--color-paper))" strokeWidth="1.9" strokeLinecap="round" />
        <circle cx="19.5" cy="22" r="3.2" fill="var(--color-warm)" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="font-serif text-[1.5rem] leading-none tracking-[-0.02em]" style={{ fontWeight: 500 }}>
        Sayable
      </span>
    </span>
  );
}
