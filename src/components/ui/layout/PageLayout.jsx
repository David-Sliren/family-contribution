import { cn } from "@/utils/cn";
import { Title } from "../title/Title";

export function PageLayout({
  title,
  subtitle,
  description,
  className,
  children,
}) {
  return (
    <main
      className={cn(
        "min-h-[90dvh] max-h-[90dvh] max-w-7xl mx-auto px-6 py-12 pb-30 space-y-8 not-scrollbar overflow-y-auto",
        className,
      )}
    >
      <header className="mb-8 max-w-[750px]">
        <Title title={title} subtitle={description} />
      </header>
      {children}
    </main>
  );
}
