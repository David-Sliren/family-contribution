import { createPatient, updatePatient } from "@/services/patient/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createPatients"],
    mutationFn: (data) => createPatient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["main-patient"],
        exact: true,
      });
    },
  });
};

export const useUpdatePatient = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updatePatient", id],
    mutationFn: (data) => updatePatient(id, data),
    onSuccess: () => {
      const mainPatient = queryClient.getQueryData(["main-patient"]);
      const isMainPatientId = mainPatient?.id === id;
      queryClient.invalidateQueries({
        predicate: (query) => {
          return isMainPatientId
            ? query.queryKey[0] === "main-patient" ||
                query.queryKey[0] === "patients"
            : query.queryKey[0] === "patients";
        },
      });
    },
  });
};
