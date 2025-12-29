"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { submitAdmissionRequest } from "@/services/admissionEnquiryServices";
import swal from "sweetalert";

export const useAdmissionEnquiryForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: submitAdmissionRequest,
    onSuccess: (result) => {
      if (result?.status === true) {
        swal("Thank you", result?.message || "Success", "success");
        reset();
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (error) => {
      swal("Error", error?.message || "Something went wrong", "error");
    },
  });

  return { handleSubmit, register, mutate, isPending, setValue };
};
