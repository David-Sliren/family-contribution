import { MetricCard, Card } from "@/components/ui/cards/Card";

/**
 * Asimetría intencional (DESIGN.md, "Do: Embrace Asymmetry"): en vez de 4
 * columnas idénticas como en el HTML original, la métrica principal
 * ("Fondo disponible") ocupa el doble de espacio.
 */

const metrics = [
  {
    label: "Fondo disponible",
    value: "$ 2.480.000",
    hint: "Muestra de interfaz",
  },
  { label: "Aportes este mes", value: "18", hint: "Últimos 30 días" },
  { label: "Gasto mensual", value: "$ 684.000", hint: "4 categorías activas" },
  {
    label: "Fondo recaudado",
    value: "$ 2.480.000",
    hint: "Durante esta semana",
  },
];

export function MetricsGrid() {
  const [main, ...rest] = metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="md:col-span-2 px-6 py-6">
        <span className="block text-[12px] text-on-surface-variant font-body mb-2.5">
          {main.label}
        </span>
        <strong className="block text-4xl font-display tracking-tight text-on-surface">
          {main.value}
        </strong>
        {main.hint && (
          <small className="block mt-1.5 text-[11px] text-on-surface-variant font-body">
            {main.hint}
          </small>
        )}
      </Card>

      {rest.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}
