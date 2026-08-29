import { PanelCard } from "@/components/ui/cards/Card";

/**
 * "Timeline Nodes" (DESIGN.md, Cards & Lists): la línea que conecta eventos
 * es un degradado sutil entre tonos, no un trazo duro.
 */

const events = [
  {
    title: "Nuevo aporte registrado",
    description: "Contribución destinada al cuidado general.",
    time: "10:42",
  },
  {
    title: "Stock actualizado",
    description: "Se ajustó la existencia de Losartán.",
    time: "Ayer",
  },
  {
    title: "Gasto añadido",
    description: "Comprobante cargado para consulta externa.",
    time: "22 ago",
  },
];

export function ActivityTimeline() {
  return (
    <PanelCard title="Actividad reciente">
      <div className="grid gap-4">
        {events.map((event, i) => (
          <div
            key={i}
            className="grid grid-cols-[12px_1fr_auto] gap-3 items-start"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                i === 0 ? "bg-primary-container" : "bg-surface-container-high"
              }`}
            />
            <p className="m-0 text-[13px] font-body text-on-surface">
              <strong>{event.title}</strong>
              <br />
              <span className="text-on-surface-variant">
                {event.description}
              </span>
            </p>
            <time className="text-[11px] text-on-surface-variant font-body whitespace-nowrap">
              {event.time}
            </time>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
