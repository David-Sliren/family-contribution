"use client";

import { ListContainer } from "@/components/ui/containers/ListContainer";
import React, { useRef, useState } from "react";
import { UpdateExpenseDialog } from "../UpdateExpenseDialog";
import { CardExpense } from "./CardExpense";
import { useExpensesQueryAll } from "@/hooks/tanstack/query/useQueryExpenses";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";
import { useQueryState } from "nuqs";
import { parseAsString, parseAsInteger } from "nuqs";
import { GlassPaginationBasic } from "@/components/ui/glass-componenst/GlassPagination";

export const ListExpenses = () => {
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [category] = useQueryState("category", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ clearOnDefault: true, scroll: true }),
  );
  const [editExpense, setEditExpense] = useState(null);
  const dialogRef = useRef(null);
  const { data: expenses } = useExpensesQueryAll({
    category,
    search,
    page: page,
    limit: 10,
  });
  const pagination = expenses.pagination;

  function handleEditExpense(expense) {
    setEditExpense(expense);
    dialogRef.current?.showModal();
  }

  function handleNextPage() {
    setPage((old) => old + 1);
  }

  function handlePrevPage() {
    setPage((old) => Math.max(old - 1, 1));
  }

  return (
    <section className="xl:max-w-8/15 space-y-2.5">
      {!expenses.data.length ? (
        <AnimationEmpy title="No hay gastos" />
      ) : (
        <>
          <ListContainer>
            <UpdateExpenseDialog expense={editExpense} dialogRef={dialogRef} />
            {expenses.data?.map((expense) => (
              <CardExpense
                key={expense.id}
                expense={expense}
                handdler={handleEditExpense}
              />
            ))}
          </ListContainer>

          <GlassPaginationBasic
            pageNumber={page}
            totalPages={pagination.totalPages}
            hasNext={pagination.hasNextPage}
            hasPrev={pagination.hasPrevPage}
            handleNext={handleNextPage}
            handlePrev={handlePrevPage}
          />
        </>
      )}
    </section>
  );
};
