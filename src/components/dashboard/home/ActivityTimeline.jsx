"use client";

import { PanelCard } from "@/components/ui/cards/Card";
import { useEventsQuery } from "@/hooks/tanstack/query/useQueryEvent";

/**
 * "Timeline Nodes" (DESIGN.md, Cards & Lists): la línea que conecta eventos
 * es un degradado sutil entre tonos, no un trazo duro.
 */

export function ActivityTimeline() {
  const { data } = useEventsQuery();

  const events = data?.data ?? [];

  return (
    <PanelCard title="Actividad reciente">
      <div className="grid gap-4">
        {events.length === 0 && (
          <p className="m-0 text-[13px] font-body text-on-surface-variant">
            Aún no hay actividad registrada.
          </p>
        )}
        {events.map((event, i) => (
          <div
            key={event.id}
            className="grid grid-cols-[12px_1fr_auto] gap-3 items-start"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                i === 0 ? "bg-primary-container" : "bg-surface-container-high"
              }`}
            />
            <p className="m-0 text-[13px] font-body text-on-surface">
              <strong>{event.description}</strong>
              <br />
              <span className="text-on-surface-variant">
                {event.createBy?.name ? `por ${event.createBy.name}` : ""}
              </span>
            </p>
            <time
              dateTime={event.createdAt}
              className="text-[11px] text-on-surface-variant font-body whitespace-nowrap"
            >
              {new Date(event.createdAt).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "short",
              })}
            </time>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
