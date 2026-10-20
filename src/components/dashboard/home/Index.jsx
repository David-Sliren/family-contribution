import { Suspense } from "react";
import { MetricsGrid } from "./MetricsGrid";
import { ActivityTimeline } from "./ActivityTimeline";
import { ThreePoints } from "@/components/ui/loader/ThreePoints";
import { DashboardShell } from "../layout/DashboardShell";

export const Index = ({ title, subtitle, description }) => {
  return (
    <DashboardShell title={title} subtitle={subtitle} description={description}>
      <MetricsGrid />
      <section className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-6">
        <Suspense fallback={<ThreePoints />}>
          <ActivityTimeline />
        </Suspense>
      </section>
    </DashboardShell>
  );
};
