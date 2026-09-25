"use client";
import { useExpensesQueryAll } from "@/hooks/tanstack/query/useQueryExpenses";
import { useQueryState } from "nuqs";
import { parseAsString, parseAsInteger } from "nuqs";
import { GlassPaginationBasic } from "@/components/ui/glass-componenst/GlassPagination";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";
import { ExpenseCard } from "./ExpenseCard";

export const ExpenseList = () => {
  const [category] = useQueryState("category", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ clearOnDefault: true, scroll: true }),
  );

  const { data } = useExpensesQueryAll({ category, page, limit: 10 });
  const pagination = data.pagination;

  function handleNextPage() {
    setPage((old) => old + 1);
  }

  function handlePrevPage() {
    setPage((old) => Math.max(old - 1, 1));
  }

  if (!data.data.length) return <AnimationEmpy title="No hay gastos" />;

  return (
    <section className="space-y-2.5">
      <div className="space-y-6 min-h-120 overflow-x-hidden not-scrollbar animate-fade-in xl:scroll-hiden pb-8">
        {data.data.map((item) => (
          <ExpenseCard
            key={item.id}
            {...{
              name: item.name,
              price: item.amount,
              lastUpdate: item.date,
              category: item.category,
            }}
          />
        ))}
      </div>

      <GlassPaginationBasic
        pageNumber={page}
        totalPages={pagination.totalPages}
        hasNext={pagination.hasNextPage}
        hasPrev={pagination.hasPrevPage}
        handleNext={handleNextPage}
        handlePrev={handlePrevPage}
      />
    </section>
  );
};
