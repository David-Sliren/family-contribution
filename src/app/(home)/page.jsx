import { Hero } from "@/components/home/hero/Hero";
import { Stats } from "@/components/home/stats/Stats";
import { ContributionTable } from "@/components/home/table/ContributionTable";
import { NotificationPayment } from "@/components/ui/notifications/NotificationPayment";
import { titleFont } from "@/config/fonts";

export default async function Home({ searchParams }) {
  const query = await searchParams;
  const state = query.state;
  return (
    <div className={titleFont.className}>
      <Hero />
      <Stats />
      <ContributionTable />
      <NotificationPayment status={state} />
    </div>
  );
}
