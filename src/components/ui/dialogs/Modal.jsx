import { cn } from "@/utils/cn";

export const Modal = ({
  ref,
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <dialog
      ref={ref}
      className={cn(
        "rounded-2xl p-0  w-[calc(100vw-32px)] bg-surface-container-lowest text-on-surface shadow-tonal-lg backdrop:bg-on-surface/10 m-auto animate-fade-in-up",
        className,
      )}
      {...props}
    >
      <div className="p-7">
        <h2 className="text-2xl tracking-tight m-0 mb-1.5">{title}</h2>
        {description && (
          <p className="text-on-surface-variant text-[13px] font-body m-0 mb-5">
            {description}
          </p>
        )}
        {children}
      </div>
    </dialog>
  );
};
