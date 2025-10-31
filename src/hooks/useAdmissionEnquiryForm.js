"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { submitAdmissionRequest } from "@/services/admissionEnquiryServices";
import swal from "sweetalert";

export const useAdmissionEnquiryForm = () => {

    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: submitAdmissionRequest,
        onSuccess: (result) => {
            if (result['status'] == true) {
                swal("Thank you", result['message'], "success");
                reset();
            } else {
                swal("Error", result.message, "error");
            }
        },
        onError: () => {
            swal("Error", result.message, "error");
        }
    });

    return { handleSubmit, register, mutate, isPending };
}