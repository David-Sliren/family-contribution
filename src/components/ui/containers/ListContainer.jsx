import { cn } from "@/utils/cn";

export const ListContainer = ({ children, className }) => {
  return (
    <section
      className={cn(
        "w-full min-h-120 space-y-2  sm:overflow-y-auto scroll-hiden",
        className,
      )}
    >
      {children}
    </section>
  );
};
