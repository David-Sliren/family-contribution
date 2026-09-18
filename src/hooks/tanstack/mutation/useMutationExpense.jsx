import {
  createExpense,
  deleteExpense,
  updateExpense,
} from "@/services/expenses/expenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// user-contribution
export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-expense"],
    mutationFn: (data) => createExpense(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["expenses"],
          exact: true,
        }),
      ]);
    },
  });
};

export const useUpdateExpense = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-expense", id],
    mutationFn: (data) => updateExpense(id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["expenses"],
          exact: true,
        }),
      ]);
    },
  });
};

export const useDeleteExpense = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-expense", id],
    mutationFn: () => deleteExpense(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["expenses"],
          exact: true,
        }),
      ]);
    },
  });
};
