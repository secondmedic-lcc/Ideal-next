import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useMutation } from "@tanstack/react-query";
import { createJobOpening } from "@/services/admin/jobOpeningService";

export const useJobOpeningHooks = () => {

    const { handleSubmit, register, reset } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: createJobOpening,
        onSuccess: (result) => {
            if (result?.status === true) {
                swal("Success", result.message || "Job Opening created", "success");
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

    return { handleSubmit, register, reset, mutate, isPending };
}