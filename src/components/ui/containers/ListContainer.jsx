import { cn } from "@/utils/cn";

export const ListContainer = ({ children, className }) => {
  return (
    <section
      className={cn(
        "w-full max-h-120 min-h-120 space-y-2  overflow-y-auto scroll-hiden",
        className,
      )}
    >
      {children}
    </section>
  );
};
