"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "@/services/admin/adminLogin";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export const useAdminLogin = () => {

    const router = useRouter();

    const { handleSubmit, register, reset } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: adminLogin,
        onSuccess: (result) => {
            swal("Thank you", result.message, "success");
            router.push("/admin/dashboard");
            reset();
        },
        onError: () => {
            swal("Error", result.message, "error");
        }
    });

    return { handleSubmit, register, mutate, isPending };
}