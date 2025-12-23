"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
import { saveGalleryVideo } from "@/services/admin/galleryVideoService";

export default function AddVideoInCategory() {
  const { categoryId } = useParams();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: saveGalleryVideo,
    onSuccess: (result) => {
      if (result?.status === true) {
        swal("Success", result.message || "Video added", "success");
        reset();
        router.push(`/admin/gallery-video/${categoryId}`);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => swal("Error", err.message || "Network error", "error"),
  });

  const onSubmit = (form) => {
    mutate({
      title: form.title,
      link: form.link,
      video_category_id: categoryId, // ✅ auto bind
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <h5 className="admin-card-title">Add Video (Category: {categoryId})</h5>
        </div>

        <div className="admin-card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Video Title</label>
              <input className="form-control" {...register("title", { required: true })} />
            </div>

            <div className="mb-3">
              <label className="form-label">Video Link (embed url)</label>
              <textarea className="form-control" rows={3} {...register("link", { required: true })} />
            </div>

            <button className="btn btn-success" type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
