"use client";

import { ListContainer } from "@/components/ui/containers/ListContainer";
import React, { useRef, useState } from "react";
import { UpdateExpenseDialog } from "../UpdateExpenseDialog";
import { CardExpense } from "./CardExpense";
import { useExpensesQueryAll } from "@/hooks/tanstack/query/useQueryExpenses";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";

export const ListExpenses = () => {
  const { data } = useExpensesQueryAll();
  const [editExpense, setEditExpense] = useState(null);
  const dialogRef = useRef(null);

  function handleEditExpense(expense) {
    setEditExpense(expense);
    dialogRef.current?.showModal();
  }

  return (
    <ListContainer>
      <UpdateExpenseDialog expense={editExpense} dialogRef={dialogRef} />
      {!data.length ? (
        <AnimationEmpy title="No hay gastos" />
      ) : (
        data?.map((expense) => (
          <CardExpense
            key={expense.id}
            expense={expense}
            handdler={handleEditExpense}
          />
        ))
      )}
    </ListContainer>
  );
};
