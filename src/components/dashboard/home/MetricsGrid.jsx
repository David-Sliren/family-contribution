"use client";

import { MetricCard, Card } from "@/components/ui/cards/Card";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import { formatMoney } from "@/config/money";

/**
 * Asimetría intencional (DESIGN.md, "Do: Embrace Asymmetry"): en vez de 4
 * columnas idénticas como en el HTML original, la métrica principal
 * ("Fondo disponible") ocupa el doble de espacio.
 */

export function MetricsGrid() {
  const { data: patient } = useMainPatientQuery();

  const totalFunds = patient?.totalFunds ?? 0;
  const totalExpenses = patient?.totalExpenses ?? 0;
  const monthExpenses = patient?.monthExpenses ?? 0;
  const totalInventories = patient?.totalInventories ?? 0;
  const availableFunds = Math.max(totalFunds - totalExpenses, 0);

  const metrics = [
    {
      label: "Fondo disponible",
      value: formatMoney(availableFunds),
      hint: "Fondo total menos gastos",
    },
    {
      label: "Aportes este mes",
      value: String(patient?.monthFunds ?? 0),
      hint: "Contribuciones del mes en curso",
    },
    {
      label: "Gasto del mes",
      value: formatMoney(monthExpenses),
      hint: "Gastos del mes en curso",
    },
    {
      label: "Fondo recaudado",
      value: formatMoney(totalFunds),
      hint: "Aportes acumulados",
    },
    {
      label: "Gasto total",
      value: formatMoney(totalExpenses),
      hint: "Gastos registrados",
    },
    {
      label: "Total de inventarios",
      value: totalInventories,
      hint: "Inventarios registrados",
    },
  ];

  const [main, ...rest] = metrics;

  return (
    <div className="flex flex-col sm:flex-row flex-wrap  sm:items-center gap-2 sm:gap-4 mb-8">
      <Card className="sm:basis-xs grow-0 shrink-0 px-6 py-6">
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
      {/* <div className="w-full flex flex-wrap"> */}
      {rest.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
      {/* </div> */}
    </div>
  );
}
