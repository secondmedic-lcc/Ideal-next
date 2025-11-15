import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useMutation } from "@tanstack/react-query";
import { createBranchLocator } from "@/services/admin/branchLocatorServices";

export const useBranchLocator = () => {

    const { handleSubmit, register, reset } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: createBranchLocator,
        onSuccess: (result) => {
            if (result?.status === true) {
                swal("Success", result.message || "Course created", "success");
                reset();
                setPreviewSrc(null);
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