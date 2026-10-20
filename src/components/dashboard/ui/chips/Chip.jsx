import clsx from "clsx";

const TONES = {
  neutral: "bg-secondary-fixed text-on-secondary-container",
  success: "bg-secondary-fixed text-on-secondary-container",
  alert: "bg-primary-container/20 text-primary",
};

/**
 * Chip en pastilla (DESIGN.md: "Collaboration Chips"). Reutilizado también
 * para estados de stock/pago ("Reponer", "Confirmada", "Pendiente").
 */
export function Chip({ tone = "alert", dot = false, children }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
        {
          "bg-secondary-fixed text-on-secondary-container": tone === "neutral",
          "bg-secondary-fixed text-on-secondary-container": tone === "success",
          "bg-primary-container/20 text-primary": tone === "alert",
        },
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
}
