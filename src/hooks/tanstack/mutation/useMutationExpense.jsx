import {
  createExpense,
  deleteExpense,
  updateExpense,
} from "@/services/expenses/expenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useInvalidateExpense = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["expenses"] });
};

export const useCreateExpense = () => {
  const invalidate = useInvalidateExpense();
  return useMutation({ mutationFn: createExpense, onSuccess: invalidate });
};

export const useUpdateExpense = (id) => {
  const invalidate = useInvalidateExpense();
  return useMutation({
    mutationFn: (data) => updateExpense(id, data),
    onSuccess: invalidate,
  });
};

export const useDeleteExpense = (id) => {
  const invalidate = useInvalidateExpense();
  return useMutation({ mutationFn: () => deleteExpense(id), onSuccess: invalidate });
};
