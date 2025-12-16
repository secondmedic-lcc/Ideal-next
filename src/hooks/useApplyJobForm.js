"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
import { submitApplyJobRequest } from "@/services/careerServices";

export const useApplyJobForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: submitApplyJobRequest,
    onSuccess: (result) => {
      if (result?.status === true) {
        swal("Thank you", result.message, "success");
        reset();
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (error) => {
      swal("Error", error?.message || "Server error", "error");
    },
  });

  return { handleSubmit, register, mutate, isPending, errors };
};
