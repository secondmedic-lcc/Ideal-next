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
} from "@/services/admin/testimonialServices";
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

    const name = item.name ?? "";
    const rating = item.rating ?? "";
    const review = item.review ?? "";
    const image = item.image ?? null;

    reset({ name, rating, review, image: null });

    const imgUrl =
      typeof image === "string" && image.startsWith("http")
        ? image
        : image
        ? `${imageUrl}${image}`
        : null;

    setExistingImageUrl(imgUrl);
    setPreviewSrc(null);
    setValue("name", name);
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
        swal("Success", res.message || "Testimonial updated", "success").then(
          () => {
            qc.invalidateQueries({ queryKey: ["testimonial"] });
            qc.invalidateQueries({
              queryKey: ["testimonial", gallery_id],
            });
            router.push("/admin/testimonial");
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
    if (values.name) formData.append("name", values.name);
    if (values.rating) formData.append("rating", values.rating);
    if (values.review) formData.append("review", values.review);

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    }

    mutation.mutate({ gallery_id, formData });
  };

  if (isFetching) return <div className="admin-page">Loading photo data…</div>;

  if (isError)
    return (
      <div className="admin-page text-danger">Failed to load photo data.</div>
    );

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiImage size={18} />
            <h5 className="admin-card-title">Edit Testimonial</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row">
                          
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiUpload />
                  Testimonial Image
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

              
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Enter user's name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">
                  Rating
                </label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step="any"
                  className={`form-control ${errors.rating ? "is-invalid" : ""}`}
                  placeholder="e.g. 3.5"
                  {...register("rating", {
                    required: "Rating is required",
                  })}
                />
                {errors.rating && (
                  <div className="invalid-feedback">{errors.rating.message}</div>
                )}
              </div>

            </div>
            <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label fw-semibold">
                    Write your review
                  </label>
                  <textarea
                    className={`form-control ${errors.review ? "is-invalid" : ""}`}
                    {...register("review", {
                      required: "Review is required",
                    })}
                  ></textarea>
                  {errors.review && (
                    <div className="invalid-feedback">{errors.review.message}</div>
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
                onClick={() => router.push("/admin/testimonial")}
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
