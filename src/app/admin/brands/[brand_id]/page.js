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

// ✅ Dynamically import ReactQuill (for Next.js)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const EditBrands = () => {
    
    useEffect(() => {
        import("react-quill-new/dist/quill.snow.css").catch(() => {});
    }, []);
    
  const params = useParams();
  const rawBrandId = params?.brand_id;
  const brandId = rawBrandId ? Number(rawBrandId) : null;

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

  // ✅ Fetch brand data
  const { data: rawRes, isLoading, isError } = useQuery({
    queryKey: ["brand", brandId],
    queryFn: () => getBrandById(brandId),
    enabled: !!brandId,
  });

  const brandPayload = useMemo(() => {
    if (!rawRes) return null;
    if (rawRes.data && typeof rawRes.data === "object") return rawRes.data;
    return rawRes;
  }, [rawRes]);

  // ✅ When data loads, populate form
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

    const imageFile = brandPayload.brand_logo ?? brandPayload.image ?? null;
    setExistingImage(imageFile ? `${imageUrl}${imageFile}` : null);
  }, [brandPayload, reset]);

  // ✅ Update brand mutation
  const mutation = useMutation({
    mutationFn: (formData) => updateBrand(brandId, formData),
    onSuccess: (res) => {
      if (res?.status === true) {
        swal("Success", res.message || "Brand updated successfully", "success");
        queryClient.invalidateQueries({ queryKey: ["brands"] });
        queryClient.invalidateQueries({ queryKey: ["brand", brandId] });
      } else {
        swal("Error", res?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => swal("Error", err?.message || "Network error", "error"),
  });

  // ✅ Watch file input for preview
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

  // ✅ Submit handler
  const onSubmit = async (values) => {
    if (!brandId) {
      swal("Error", "Invalid brand id", "error");
      return;
    }

    try {
      const formData = new FormData();

      const fields = ["title","subtitle", "small_description", "long_description", "key_features"];
      fields.forEach((f) => {
        if (values[f]) formData.append(f, values[f]);
      });

      if (values.brand_logo && values.brand_logo.length > 0) {
        formData.append("brand_logo", values.brand_logo[0]);
      }

      mutation.mutate(formData);
    } catch (err) {
      swal("Error", err?.message || "Unable to submit form", "error");
    }
  };

  const handleReset = () => {
    if (initialValues) reset(initialValues);
    setPreviewSrc(null);
  };

  // ✅ UI rendering
  if (!brandId) {
    return (
      <div className="container mt-4 text-danger">
        Invalid or missing <strong>brand_id</strong> in URL.
      </div>
    );
  }

  if (isLoading) return <div className="container mt-4">Loading brand...</div>;
  if (isError) return <div className="container mt-4 text-danger">Failed to load brand.</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-white p-3">
          <h5 className="mb-0">Edit Brand</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Brand Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title", { required: "Brand title is required" })}
                />
                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Brand Sub Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.subtitle ? "is-invalid" : ""}`}
                  {...register("subtitle", { required: "Brand subtitle is required" })}
                />
                {errors.subtitle && <div className="invalid-feedback">{errors.subtitle.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Short Description</label>
                <textarea className={`form-control ${errors.small_description ? "is-invalid" : ""}`}
                  {...register("small_description", { required: "Short description is required" })}></textarea>
                {errors.small_description && (
                  <div className="invalid-feedback">{errors.small_description.message}</div>
                )}
              </div>


              {/* ✅ Brand Image */}
              <div className="col-md-6 mb-3">
                <div className="row">
                  <div className="col-md-8">
                    <label className="form-label">Brand Logo (replace)</label>
                    <input type="file" className="form-control" accept="image/*" {...register("brand_logo")} />
                    <small className="text-muted">Upload new logo to replace the existing one.</small>
                  </div>

                  <div className="col-md-4">
                    {previewSrc ? (
                      <div className="mt-2">
                        <small className="text-muted">New Preview:</small>
                        <div>
                          <img src={previewSrc} alt="preview" style={{ maxWidth: "160px", maxHeight: "100px" }} />
                        </div>
                      </div>
                    ) : existingImage ? (
                      <div className="mt-2">
                        <small className="text-muted">Existing Logo:</small>
                        <div>
                          <img src={existingImage} alt="existing" style={{ maxWidth: "160px", maxHeight: "100px" }} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* ✅ Long Description (ReactQuill) */}
              <div className="col-6 mb-3">
                <label className="form-label">Long Description</label>
                <Controller
                  name="long_description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Enter long description..."
                    />
                  )}
                />
              </div>

              {/* ✅ Key Features (ReactQuill) */}
              <div className="col-6 mb-3">
                <label className="form-label">Key Features</label>
                <Controller
                  name="key_features"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Enter key features..."
                    />
                  )}
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={mutation.isLoading || isSubmitting}>
                {mutation.isLoading || isSubmitting ? "Updating..." : "Update Brand"}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
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
