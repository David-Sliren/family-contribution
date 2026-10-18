import {
  createPatient,
  setMainPatient,
  updatePatient,
} from "@/services/patient/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// invalida las queries de pacientes y del paciente principal, para que la
// grilla, el PortCard (home) y el Sidebar se refresquen tras cada cambio
const useInvalidatePatient = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["main-patient"] });
    queryClient.invalidateQueries({ queryKey: ["patients"] });
  };
};

// cambiar el paciente principal cambia tambien inventarios, gastos,
// contribuciones, eventos y metricas de usuario: se limpia toda la cache
const useInvalidateAllByPatient = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["main-patient"] });
    queryClient.invalidateQueries({ queryKey: ["patients"] });
    queryClient.invalidateQueries({ queryKey: ["inventory"] });
    queryClient.invalidateQueries({ queryKey: ["expenses"] });
    queryClient.invalidateQueries({ queryKey: ["contributions"] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["events"] });
  };
};

export const useCreatePatient = () => {
  const invalidate = useInvalidatePatient();
  return useMutation({ mutationFn: createPatient, onSuccess: invalidate });
};

export const useUpdatePatient = (id) => {
  const invalidate = useInvalidatePatient();
  return useMutation({
    mutationFn: (data) => updatePatient(id, data),
    onSuccess: invalidate,
  });
};

export const useSetMainPatient = () => {
  const invalidate = useInvalidateAllByPatient();
  return useMutation({
    mutationFn: (id) => setMainPatient(id),
    onSuccess: invalidate,
  });
};
