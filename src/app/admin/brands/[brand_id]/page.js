/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
import { useParams } from "next/navigation";
import { getBrandById, updateBrand } from "@/services/admin/brandServices";
import { imageUrl } from "@/services/baseUrl";
import {
  FiLayers,
  FiImage,
  FiFileText,
  FiList,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const EditBrands = () => {
  useEffect(() => {
    import("react-quill-new/dist/quill.snow.css").catch(() => {});
  }, []);

  const params = useParams();
  const brandId = params?.brand_id ? Number(params.brand_id) : null;

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [previewSrc, setPreviewSrc] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const readerRef = useRef(null);

  /* =======================
     Fetch Brand
  ======================= */
  const {
    data: rawRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brand", brandId],
    queryFn: () => getBrandById(brandId),
    enabled: !!brandId,
  });

  const brandPayload = useMemo(() => {
    if (!rawRes) return null;
    return rawRes?.data && typeof rawRes.data === "object"
      ? rawRes.data
      : rawRes;
  }, [rawRes]);

  useEffect(() => {
    if (!brandPayload) return;

    const defaults = {
      title: brandPayload.title ?? "",
      subtitle: brandPayload.subtitle ?? "",
      small_description: brandPayload.small_description ?? "",
      long_description: brandPayload.long_description ?? "",
      key_features: brandPayload.key_features ?? "",
    };

    setInitialValues(defaults);
    reset(defaults);

    const imageFile = brandPayload.brand_logo ?? null;
    setExistingImage(imageFile ? `${imageUrl}${imageFile}` : null);
  }, [brandPayload, reset]);

  /* =======================
     Update Mutation
  ======================= */
  const mutation = useMutation({
    mutationFn: (formData) => updateBrand(brandId, formData),
    onSuccess: (res) => {
      if (res?.status) {
        swal("Success", res.message || "Brand updated successfully", "success");
        queryClient.invalidateQueries({ queryKey: ["brands"] });
        queryClient.invalidateQueries({ queryKey: ["brand", brandId] });
      } else {
        swal("Error", res?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => swal("Error", err?.message || "Network error", "error"),
  });

  /* =======================
     Image Preview
  ======================= */
  const watchedFile = watch("brand_logo");

  useEffect(() => {
    if (readerRef.current) {
      readerRef.current.onload = null;
      readerRef.current = null;
    }

    if (watchedFile && watchedFile.length > 0) {
      const file = watchedFile[0];
      const reader = new FileReader();
      readerRef.current = reader;
      reader.onload = (e) => setPreviewSrc(e.target.result);
      reader.readAsDataURL(file);

      return () => {
        reader.onload = null;
        readerRef.current = null;
      };
    } else {
      setPreviewSrc(null);
    }
  }, [watchedFile]);

  /* =======================
     Submit
  ======================= */
  const onSubmit = (values) => {
    if (!brandId) {
      swal("Error", "Invalid brand id", "error");
      return;
    }

    const formData = new FormData();
    [
      "title",
      "subtitle",
      "small_description",
      "long_description",
      "key_features",
    ].forEach((f) => values[f] && formData.append(f, values[f]));

    if (values.brand_logo?.length > 0) {
      formData.append("brand_logo", values.brand_logo[0]);
    }

    mutation.mutate(formData);
  };

  const handleReset = () => {
    if (initialValues) reset(initialValues);
    setPreviewSrc(null);
  };

  /* =======================
     Guards
  ======================= */
  if (!brandId) {
    return (
      <div className="admin-page text-danger">
        Invalid or missing <strong>brand_id</strong>.
      </div>
    );
  }

  if (isLoading) return <div className="admin-page">Loading brand…</div>;
  if (isError)
    return <div className="admin-page text-danger">Failed to load brand.</div>;

  /* =======================
     UI
  ======================= */
  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiLayers size={18} />
            <h5 className="admin-card-title">Edit Brand</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row">
              {/* Title */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Brand Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title", { required: "Brand name is required" })}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>

              {/* Subtitle */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Brand Subtitle</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.subtitle ? "is-invalid" : ""
                  }`}
                  {...register("subtitle", {
                    required: "Brand subtitle is required",
                  })}
                />
                {errors.subtitle && (
                  <div className="invalid-feedback">
                    {errors.subtitle.message}
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Short Description
                </label>
                <textarea
                  rows={4}
                  className={`form-control ${
                    errors.small_description ? "is-invalid" : ""
                  }`}
                  {...register("small_description", {
                    required: "Short description is required",
                  })}
                />
                {errors.small_description && (
                  <div className="invalid-feedback">
                    {errors.small_description.message}
                  </div>
                )}
              </div>

              {/* Logo */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiImage />
                  Brand Logo
                </label>
                <div className="d-flex gap-3 align-items-start">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    {...register("brand_logo")}
                  />

                  {previewSrc ? (
                    <img
                      src={previewSrc}
                      alt="preview"
                      className="rounded"
                      style={{ width: 90, height: 60, objectFit: "contain" }}
                    />
                  ) : existingImage ? (
                    <img
                      src={existingImage}
                      alt="existing"
                      className="rounded"
                      style={{ width: 90, height: 60, objectFit: "contain" }}
                    />
                  ) : null}
                </div>
              </div>

              {/* Long Description */}
              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiFileText />
                  Long Description
                </label>
                <Controller
                  name="long_description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      style={{ minHeight: 180 }}
                    />
                  )}
                />
              </div>

              {/* Key Features */}
              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiList />
                  Key Features
                </label>
                <Controller
                  name="key_features"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      style={{ minHeight: 180 }}
                    />
                  )}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button
                type="submit"
                className="theme-btn"
                disabled={mutation.isLoading || isSubmitting}
              >
                <FiSave />
                {mutation.isLoading || isSubmitting
                  ? "Updating..."
                  : "Update Brand"}
              </button>

              <button
                type="button"
                className="theme-btn btn-danger"
                onClick={handleReset}
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBrands;
