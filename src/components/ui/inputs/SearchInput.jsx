import { cn } from "@/utils/cn";

export function SearchInput({ className = "", ...props }) {
  return (
    <input
      type="search"
      className={cn(
        "w-full md:min-w-md xl:min-w-xl bg-surface-container-low border-primary/15 border rounded-full py-3 px-6 text-sm text-on-surface shadow-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/60  transition-all",
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
        "w-fit appearance-none bg-surface-container-low border-primary/15 border rounded-full py-2 px-6 font-headline-md text-label-md text-on-surface shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
