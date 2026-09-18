import {
  createInventory,
  deleteInventory,
  updateInventory,
} from "@/services/inventory/inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useInvalidateInventory = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["inventory"] });
};

export const useCreateInventory = () => {
  const invalidate = useInvalidateInventory();
  return useMutation({ mutationFn: createInventory, onSuccess: invalidate });
};

export const useUpdateInventory = (id) => {
  const invalidate = useInvalidateInventory();
  return useMutation({
    mutationFn: (data) => updateInventory(id, data),
    onSuccess: invalidate,
  });
};

export const useDeleteInventory = (id) => {
  const invalidate = useInvalidateInventory();
  return useMutation({ mutationFn: () => deleteInventory(id), onSuccess: invalidate });
};
