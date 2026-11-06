"use client";

/** Opens the privacy preferences dialog from anywhere on the site. */
export function ConsentSettingsButton({ className = "text-link", children = "Privacy choices" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("sayable:open-consent"))}>
      {children}
    </button>
  );
}
