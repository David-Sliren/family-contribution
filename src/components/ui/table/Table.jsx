import { ThreePoints } from "@/components/ui/loader/ThreePoints";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";
import { cn } from "@/utils/cn";

export const Th = ({ className, text, ...props }) => {
  return (
    <th
      className={cn(
        "px-8 py-6 text-sm font-bold uppercase tracking-widest text-on-surface-variant",
        className,
      )}
      {...props}
    >
      {text}
    </th>
  );
};

export const Td = ({ className, children, ...props }) => {
  return (
    <td
      className={cn(
        "relative pl-8 py-6 text-on-surface-variant capitalize  align-text-top",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
};

export const RowBody = ({ classname, children, ...props }) => {
  return (
    <tr
      className={cn(
        "hover:bg-surface-container-low/30 transition-colors group animate-slide-in-left",
        classname,
      )}
      {...props}
    >
      {children}
    </tr>
  );
};

export const Rowhead = ({ className, children, ...props }) => {
  return (
    <tr className={cn("bg-surface-container-low/50", className)} {...props}>
      {children}
    </tr>
  );
};

export const Thead = ({ className, children, ...props }) => {
  return <thead className={cn(className)}>{children}</thead>;
};

export const TBody = ({ className, children, ...props }) => {
  return (
    <tbody
      className={cn("divide-y divide-surface-container-low", className)}
      {...props}
    >
      {children}
    </tbody>
  );
};

export const Table = ({
  hasData,
  isLoading,
  emptyTitle,
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn("relative overflow-x-auto min-h-114", className)}>
      {isLoading && <ThreePoints />}
      {!hasData ? (
        <AnimationEmpy title={emptyTitle} />
      ) : (
        <table className="w-full text-left border-collapse" {...props}>
          {children}
        </table>
      )}
    </section>
  );
};
