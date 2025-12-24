import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveGalleryVideo } from "@/services/admin/galleryVideoService";
import { deleteGalleryVideo } from "@/services/admin/galleryVideoService";

export const useGalleryVideo = () => {
  const { handleSubmit, register, reset } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: saveGalleryVideo, // ✅ correct API
    onSuccess: (result) => {
      if (result?.status === true) {
        swal(
          "Success",
          result.message || "Video added successfully",
          "success"
        );
        reset();
      } else {
        swal(
          "Error",
          result?.message || "Something went wrong",
          "error"
        );
      }
    },
    onError: (err) => {
      swal(
        "Error",
        err?.message || "Network or server error",
        "error"
      );
    },
  });

  return { handleSubmit, register, reset, mutate, isPending };
};

export const useGalleryVideoDelete = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteVideo, isPending } = useMutation({
    mutationFn: deleteGalleryVideo,
    onSuccess: (res) => {
      if (res?.status === true) {
        swal("Deleted", res.message, "success");
        queryClient.invalidateQueries(["gallery-video"]);
      } else {
        swal("Error", res?.message || "Delete failed", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Server error", "error");
    },
  });

  return { deleteVideo, isDeleting: isPending };
};
