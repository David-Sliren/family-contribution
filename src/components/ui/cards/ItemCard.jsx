import { cn } from "@/utils/cn";

const CHIP_BASE =
  "mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase";

/**
 * Tarjeta de ítem para listas home (inventario, gastos): bloque de icono,
 * título, meta, chip opcional y columna de fecha + acción.
 */
export const ItemCard = ({
  icon: Icon,
  iconClassName = "",
  title,
  meta,
  chip,
  chipClassName = "",
  dateLabel,
  dateValue,
  action,
}) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl tonal-shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start gap-5">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
            iconClassName,
          )}
        >
          <span className="text-3xl">
            <Icon />
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold font-headline text-on-surface uppercase">
            {title}
          </h2>
          <p className="text-sm font-medium text-on-surface-variant">{meta}</p>
          {chip && <div className={cn(CHIP_BASE, chipClassName)}>{chip}</div>}
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex flex-col md:items-end justify-center">
          <span className="text-xs font-semibold text-outline uppercase tracking-widest mb-1">
            {dateLabel}
          </span>
          <span className="text-on-surface font-medium">{dateValue}</span>
        </div>
        {action}
      </div>
    </div>
  );
};
