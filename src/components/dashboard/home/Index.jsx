import React from "react";
import { MetricsGrid } from "./MetricsGrid";
import { ActivityTimeline } from "./ActivityTimeline";
import { titleFont } from "@/config/fonts";

export const Index = () => {
  return (
    <main className={titleFont.className}>
      <MetricsGrid />
      <section className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-6">
        <ActivityTimeline />
      </section>
    </main>
  );
};
