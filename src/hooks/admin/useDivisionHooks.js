import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useMutation } from "@tanstack/react-query";
import { saveFaqs } from "@/services/admin/divisionServices";

export const useDivisionHooks = () => {

    const { handleSubmit, register, reset, control } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: saveFaqs,
        onSuccess: (result) => {
            if (result?.status === true) {
                swal("Success", result.message || "Data created", "success");
                reset();
            } else {
                swal("Error", result?.message || "Something went wrong", "error");
            }
        },
        onError: () => {
            const msg = err?.message || "Network or server error";
            swal("Error", msg, "error");
        },
    });

    return { handleSubmit, register, reset, mutate, isPending, control };
}