import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useMutation } from "@tanstack/react-query";
import { saveGalleryVideo } from "@/services/admin/galleryVideoService";

export const useGalleryVideo = () => {

    const { handleSubmit, register, reset } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: saveGalleryVideo,
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