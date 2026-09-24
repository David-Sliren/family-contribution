import {
  createContribution,
  updateContribution,
} from "@/services/contribution/contribution";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useInvalidateContribution = (id, includeUser = false) => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["contributions"] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
    if (includeUser) queryClient.invalidateQueries({ queryKey: ["user", id] });
  };
};

export const useCreateUserContribution = (id) => {
  const invalidate = useInvalidateContribution(id, true);
  return useMutation({
    mutationFn: (data) => createContribution(data),
    onSuccess: invalidate,
  });
};

export const useUpdateUserContribution = (id) => {
  const invalidate = useInvalidateContribution(id);
  return useMutation({
    mutationFn: (data) => updateContribution(id, data),
    onSuccess: invalidate,
  });
};
