import { updateUserRole } from "@/services/user/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
