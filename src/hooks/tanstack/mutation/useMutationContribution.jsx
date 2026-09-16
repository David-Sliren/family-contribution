import {
  createContribution,
  updateContribution,
} from "@/services/contribution/contribution";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// user-contribution
export const useCreateUserContribution = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-user-contribution", id],
    mutationFn: (data) => createContribution(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["contributions"],
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: ["users"],
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        }),
      ]);
    },
  });
};

export const useUpdateUserContribution = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-contribution", id],
    mutationFn: (data) => updateContribution(id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["contributions"],
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: ["users"],
          exact: true,
        }),
      ]);
    },
  });
};
