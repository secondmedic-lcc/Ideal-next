"use client";

import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useMutation } from "@tanstack/react-query";
import { saveContactReqest } from "@/services/contactUsServices";

export const useContactRequest = () => {

    const { handleSubmit, register, reset } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: saveContactReqest,
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

    return { handleSubmit, register, reset, mutate, isPending };
}