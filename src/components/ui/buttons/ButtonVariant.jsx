import { cn } from "@/utils/cn";

/**
 * Botón base del sistema. No usar fills planos para "primary": siempre
 * gradiente (ver Sección 3 de DESIGN.md, "Glass & Gradient Rule").
 */
export function ButtonVariant({
  variant = "primary",
  className = "",
  children,
  icon,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full font-body font-bold text-[13px] whitespace-nowrap cursor-pointer",
        className,
        {
          "bg-primary text-surface-container-lowest hover:-translate-y-0.5 hover:shadow-tonal-sm transition":
            variant === "primary",
          "bg-transparent text-primary hover:bg-surface-container-low transition":
            variant === "secundary",
        },
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
