import { cn } from "@/utils/cn";

export const ListContainer = ({ children, className }) => {
  return (
    <section
      className={cn(
        "w-full xl:max-w-8/15 max-h-125 space-y-2  overflow-y-auto scroll-hiden",
        className,
      )}
    >
      {children}
    </section>
  );
};
