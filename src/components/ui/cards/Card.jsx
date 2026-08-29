import { cn } from "@/utils/cn";

/**
 * Card base — Tonal Layering (DESIGN.md Sección 5).
 * Se "levanta" solo por el cambio de superficie (surface-container-lowest
 * sobre surface / surface-container-low), nunca con un box-shadow gris.
 */
export function Card({
  as: Tag = "article",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={cn("bg-surface-container-lowest rounded-card p-6", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function MetricCard({ label, value, hint }) {
  return (
    <Card className="px-5 py-5">
      <span className="block text-[12px] text-on-surface-variant font-body mb-2.5">
        {label}
      </span>
      <strong className="block text-2xl font-display tracking-tight text-on-surface">
        {value}
      </strong>
      {hint && (
        <small className="block mt-1 text-[11px] text-on-surface-variant font-body">
          {hint}
        </small>
      )}
    </Card>
  );
}

export function PanelCard({ title, className = "", children }) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="text-lg font-display tracking-tight text-on-surface">
          {title}
        </h2>
        {/* {headerRight} */}
      </div>
      {children}
    </Card>
  );
}
