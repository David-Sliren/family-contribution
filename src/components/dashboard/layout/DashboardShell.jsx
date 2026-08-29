import { titleFont } from "@/config/fonts";

export function DashboardShell({ title, subtitle, description, children }) {
  return (
    <main className={titleFont.className}>
      <header className="mb-8 max-w-[750px]">
        <h2 className="text-[11px] uppercase tracking-[.12em] font-bold text-on-surface-variant font-body mb-1.5">
          {subtitle}
        </h2>
        <h1 className="text-[clamp(30px,4vw,46px)] leading-[1.04] tracking-[-.03em] text-on-surface m-0">
          {title}
        </h1>
        <p className="text-on-surface-variant font-body mt-2.5 max-w-[580px]">
          {description}
        </p>
      </header>
      {children}
    </main>
  );
}
