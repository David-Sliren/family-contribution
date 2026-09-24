import { createPatient, updatePatient } from "@/services/patient/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useInvalidatePatient = (id) => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({
      predicate: (query) => {
        const mainPatient = queryClient.getQueryData(["main-patient"]);
        const isMainPatientId = mainPatient?.id === id;

        return isMainPatientId
          ? query.queryKey[0] === "main-patient" ||
              query.queryKey[0] === "patients"
          : query.queryKey[0] === "patients";
      },
    });

  return {
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: ["main-patient"] });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    invalidate,
  };
};

export const useCreatePatient = () => {
  const { invalidateAll } = useInvalidatePatient();
  return useMutation({ mutationFn: createPatient, onSuccess: invalidateAll });
};

export const useUpdatePatient = (id) => {
  const { invalidate } = useInvalidatePatient(id);
  return useMutation({
    mutationFn: (data) => updatePatient(id, data),
    onSuccess: invalidate,
  });
};
