import { Card } from "@/components/ui/cards/Card";
import { Chip } from "@/components/dashboard/ui/chips/Chip";

const STOCK_ROWS = [
  { key: "enOrden", label: "En orden" },
  { key: "bajo", label: "Bajo" },
  { key: "agotado", label: "Agotado" },
];

const category = { name: "Medicine", description: "En orden" };

/**
 * `category` = { name, description, total, badge: {label, tone}, stock: {enOrden, bajo, agotado} }
 * `stock` son valores 0–100 (ya normalizados) para las barras de progreso.
 */
export function InventoryCard() {
  const total = 12;

  return (
    <Card className="p-5">
      <div className="flex justify-between items-start gap-2.5">
        <div>
          <h3 className="text-[17px] font-display tracking-tight text-on-surface m-0">
            {category.name}
          </h3>
          <p className="text-[12px] text-on-surface-variant font-body mt-1 mb-0">
            {category.description}
          </p>
        </div>
        <Chip tone="alert">nada</Chip>
        {/* {category.badge && (
        )} */}
      </div>

      <div className="flex items-end justify-between mt-5">
        <strong className="text-[28px] font-display tracking-tight text-on-surface">
          12000
        </strong>
        <span className="text-[11px] text-on-surface-variant font-body">
          Elementos en stock
        </span>
      </div>

      <div className="grid gap-2 mt-4">
        {STOCK_ROWS.map(({ key, label }) => {
          const value = 7 ?? 0;
          const widthPct = Math.round((value / total) * 100);
          return (
            <div
              key={key}
              className="grid grid-cols-[68px_1fr_22px] gap-2 items-center text-[11px] text-on-surface-variant font-body"
            >
              <span>{label}</span>
              <div className="h-[7px] bg-surface-container-low rounded-full overflow-hidden">
                <i
                  className="block h-full bg-primary-container rounded-full"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <strong className="text-[11px] text-on-surface text-right">
                {value}
              </strong>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
