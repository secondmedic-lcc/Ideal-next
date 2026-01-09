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
} from "@/services/admin/customPageServices";
import { imageUrl } from "@/services/baseUrl";
import { FiImage, FiUpload, FiSave, FiRefreshCw, FiX } from "react-icons/fi";
import CustomPageSectionsComponent from "../sections/[page_id]/CustomPageSectionsComponent";

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
    queryKey: ["custom-page", gallery_id],
    queryFn: () => getPhotoGalleryById(gallery_id),
    enabled: !!gallery_id,
  });

  useEffect(() => {
    if (!data) return;

    const item =
      data?.data?.data || data?.data?.list?.[0] || data?.data || data;

    if (!item) return;

    const page_name = item.page_name ?? "";
    const page_slug = item.page_slug ?? "";
    const meta_title = item.meta_title ?? "";
    const meta_keyword = item.meta_keyword ?? "";
    const meta_description = item.meta_description ?? "";
    const js_scripts = item.js_scripts ?? "";
    const image = item.image ?? null;

    reset({ page_name, page_slug, meta_title, meta_keyword, meta_description, js_scripts, image: null });

    const imgUrl =
      typeof image === "string" && image.startsWith("http")
        ? image
        : image
        ? `${imageUrl}${image}`
        : null;

    setExistingImageUrl(imgUrl);
    setPreviewSrc(null);

    setValue("page_name", page_name);
    setValue("page_slug", page_slug);
    setValue("meta_title", meta_title);
    setValue("meta_keyword", meta_keyword);
    setValue("meta_description", meta_description);
    setValue("js_scripts", js_scripts);
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
            qc.invalidateQueries({ queryKey: ["custom-page"] });
            qc.invalidateQueries({
              queryKey: ["custom-page", gallery_id],
            });
            router.push("/admin/custom-page");
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
    if (values.page_name) formData.append("page_name", values.page_name);
    if (values.page_slug) formData.append("page_slug", values.page_slug);
    if (values.meta_title) formData.append("meta_title", values.meta_title);
    if (values.meta_keyword) formData.append("meta_keyword", values.meta_keyword);
    if (values.meta_description) formData.append("meta_description", values.meta_description);
    if (values.js_scripts) formData.append("js_scripts", values.js_scripts);

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
    <>
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
                         
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">
                    Page Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.page_name ? "is-invalid" : ""}`}
                    placeholder="Enter page name"
                    {...register("page_name", {
                      required: "Page Name is required",
                    })}
                  />
                  {errors.page_name && (
                    <div className="invalid-feedback">{errors.page_name.message}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">
                    Page Slug (URL)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.page_slug ? "is-invalid" : ""}`}
                    placeholder="Page Slug (autogenerated)"
                    {...register("page_slug", {
                      required: "Page slug is required",
                      onChange: () => setSlugTouched(true),
                    })}
                  />
                  {errors.page_slug && (
                    <div className="invalid-feedback">{errors.page_slug.message}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.meta_title ? "is-invalid" : ""}`}
                    placeholder="Page Title (autogenerated)"
                    {...register("meta_title", {
                      required: "Meta title is required",
                      onChange: () => setMetaTouched(true),
                    })}
                  />
                  {errors.meta_title && (
                    <div className="invalid-feedback">{errors.meta_title.message}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Meta Keywords
                  </label>
                  <textarea
                    className={`form-control ${errors.meta_keyword ? "is-invalid" : ""}`}
                    placeholder="eg. keyword1, keyword2, keyword3"
                    {...register("meta_keyword")}
                  ></textarea>
                  {errors.meta_keyword && (
                    <div className="invalid-feedback">{errors.meta_keyword.message}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Meta Description
                  </label>
                  <textarea
                    className={`form-control ${errors.meta_description ? "is-invalid" : ""}`}
                    placeholder="Write page description here"
                    {...register("meta_description")}
                  ></textarea>
                  {errors.meta_description && (
                    <div className="invalid-feedback">{errors.meta_description.message}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label fw-semibold">
                    SEO JS Scripts for Page (optional)
                  </label>
                  <textarea
                    className={`form-control ${errors.js_scripts ? "is-invalid" : ""}`}
                    placeholder="Page javascripts eg. gtag.js, fb-sjak263286.js"
                    {...register("js_scripts")}
                    rows={5}
                  ></textarea>
                  {errors.js_scripts && (
                    <div className="invalid-feedback">{errors.js_scripts.message}</div>
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
                onClick={() => router.push("/admin/custom-page")}
              >
                <FiX />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <CustomPageSectionsComponent page_id={gallery_id} />
    </>
  );
}
