import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useHookForm = ({ schema, defaultValues = {} }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues,
  });
  return { handleSubmit, register, errors, isSubmitting, reset };
};
