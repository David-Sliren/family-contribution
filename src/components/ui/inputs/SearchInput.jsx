import { cn } from "@/utils/cn";

/**
 * Campo de búsqueda — sin borde sólido (DESIGN.md, No-Line Rule aplica
 * explícitamente a search bars). Relleno con surface-container-lowest,
 * borde real solo aparece en foco vía :focus-within del padre "ghost-border".
 */
export function SearchInput({ className = "", ...props }) {
  return (
    <input
      type="search"
      className={cn(
        "ghost-border min-h-11 flex-1 min-w-[180px] bg-surface-container-lowest rounded-full px-4 text-on-surface font-body text-sm placeholder:text-on-surface-variant outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className = "", children, ...props }) {
  return (
    <select
      className={cn(
        "ghost-border min-h-11 bg-surface-container-lowest rounded-full px-4 text-on-surface-variant font-body text-sm outline-none cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
