/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";

import {
  getPhotoGalleryById,
  updatePhotoGallery,
} from "@/services/admin/whyChooseServices";
import { imageUrl } from "@/services/baseUrl";
import { FiImage, FiUpload, FiSave, FiRefreshCw, FiX } from "react-icons/fi";

export default function EditPhotoGallery() {
  const { gallery_id } = useParams();
  const router = useRouter();
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      image: null,
    },
  });

  const [previewSrc, setPreviewSrc] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  const {
    data,
    isLoading: isFetching,
    isError,
  } = useQuery({
    queryKey: ["testimonial", gallery_id],
    queryFn: () => getPhotoGalleryById(gallery_id),
    enabled: !!gallery_id,
  });

  useEffect(() => {
    if (!data) return;

    const item =
      data?.data?.data || data?.data?.list?.[0] || data?.data || data;

    if (!item) return;

    const title = item.title ?? "";
    const image = item.image ?? null;

    reset({ title, image: null });

    const imgUrl =
      typeof image === "string" && image.startsWith("http")
        ? image
        : image
        ? `${imageUrl}${image}`
        : null;

    setExistingImageUrl(imgUrl);
    setPreviewSrc(null);
    setValue("title", title);
  }, [data, reset, setValue]);

  const watchedFile = watch("image");

  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      const file = watchedFile[0];
      const reader = new FileReader();
      reader.onload = (e) => setPreviewSrc(e.target.result);
      reader.readAsDataURL(file);
      return () => (reader.onload = null);
    } else {
      setPreviewSrc(null);
    }
  }, [watchedFile]);

  const mutation = useMutation({
    mutationFn: ({ gallery_id: gid, formData }) =>
      updatePhotoGallery(gid, formData),
    onSuccess: (res) => {
      if (res?.status === true) {
        swal("Success", res.message || "Data updated", "success").then(
          () => {
            qc.invalidateQueries({ queryKey: ["why-choose"] });
            qc.invalidateQueries({
              queryKey: ["why-choose", gallery_id],
            });
            router.push("/admin/why-choose");
          }
        );
      } else {
        swal("Error", res?.message || "Update failed", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Network or server error", "error");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    if (values.title) formData.append("title", values.title);

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    }

    mutation.mutate({ gallery_id, formData });
  };

  if (isFetching) return <div className="admin-page">Loading data…</div>;

  if (isError)
    return (
      <div className="admin-page text-danger">Failed to load data.</div>
    );

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiImage size={18} />
            <h5 className="admin-card-title">Edit Item</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
           <div className="row">
                         
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <FiUpload />
                    Image
                  </label>
  
                  <input
                    type="file"
                    className="form-control"
                    {...register("image")}
                  />
  
                  {previewSrc && (
                    <div className="image-preview mt-2">
                      <img src={previewSrc} alt="preview" />
                    </div>
                  )}
                </div>
  
                
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Title Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter title name"
                    {...register("title", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.title.message}</div>
                  )}
                </div>
                
  
              </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button
                type="submit"
                className="theme-btn"
                disabled={mutation.isLoading}
              >
                <FiSave />
                {mutation.isLoading ? "Saving..." : "Update"}
              </button>

              <button
                type="button"
                className="theme-btn btn-danger"
                onClick={() => reset()}
              >
                <FiRefreshCw />
                Reset
              </button>

              <button
                type="button"
                className="theme-btn btn-warn"
                onClick={() => router.push("/admin/why-choose")}
              >
                <FiX />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
