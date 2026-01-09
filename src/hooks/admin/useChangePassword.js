"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { changePassword } from "@/services/admin/changePasswordService";

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: changePassword,
  });

  return {
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
