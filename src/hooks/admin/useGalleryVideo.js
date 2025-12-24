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
            swal("Success", result.message || "Video added successfully", "success");
            reset();
        } else {
            swal("Error", result?.message || "Something went wrong", "error");
        }
        },
        onError: (err) => {
        swal("Error", err?.message || "Network or server error", "error");
        },
    });

    return { handleSubmit, register, reset, mutate, isPending };
}