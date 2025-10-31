"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export const useAdminLogin = () => {

    const { login } = useAuthStore();

    const router = useRouter();

    const { handleSubmit, register, reset } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (result) => {
            if (result['status'] == true) {
                swal("Thank you", result['message'], "success");
                router.push("/admin/dashboard");
                reset();
            } else {
                swal("Error", result.message, "error");
            }
        },
        onError: (result) => {
            swal("Error", result, "error");
        }
    });

    return { handleSubmit, register, mutate, isPending };
}