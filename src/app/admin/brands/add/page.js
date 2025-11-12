/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useBrandHooks } from "@/hooks/admin/useBrandHooks";
import { Controller } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AddBrands() {
  const {
    onSubmit,
    register,
    control,
    isLoading,
    errors,
    previewSrc,
    reset,
  } = useBrandHooks();

  useEffect(() => {
    import("react-quill-new/dist/quill.snow.css").catch(() => {});
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-white">
          <p className="mb-0">Create Brand</p>
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="row">
              {/* Brand Title */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Brand Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title", {
                    required: "Brand name is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                  })}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>

              {/* Short Description */}
              <div className="col-6 mb-3">
                <label className="form-label">Brand Description</label>
                <textarea
                  rows="4"
                  className={`form-control ${
                    errors.small_description ? "is-invalid" : ""
                  }`}
                  {...register("small_description", {
                    required: "Brand description is required",
                    minLength: { value: 10, message: "At least 10 characters" },
                  })}
                />
                {errors.small_description && (
                  <div className="invalid-feedback">
                    {errors.small_description.message}
                  </div>
                )}
              </div>

              {/* Brand Logo */}
              <div className="col-6 mb-3">
                <div className="row">
                  <div className="col-md-8">
                    <label className="form-label">Brand Logo</label>
                    <input
                      type="file"
                      className="form-control"
                      {...register("brand_logo")}
                      accept="image/*"
                    />
                  </div>
                  <div className="col-md-4">
                    {previewSrc && (
                      <div className="mt-2">
                        <img
                          src={previewSrc}
                          alt="preview"
                          style={{ maxWidth: "160px", maxHeight: "100px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Long Description (ReactQuill controlled) */}
              <div className="mb-3 col-md-6">
                <label className="form-label fw-semibold">Description</label>
                <Controller
                  name="long_description"
                  control={control}
                  rules={{
                    required: "Long description is required",
                    minLength: {
                      value: 20,
                      message: "At least 20 characters required",
                    },
                  }}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      className={`bg-white ${
                        errors.long_description ? "border border-danger" : ""
                      }`}
                      placeholder="Write section long description..."
                      style={{ minHeight: "200px" }}
                    />
                  )}
                />
                {errors.long_description && (
                  <div className="text-danger small mt-1">
                    {errors.long_description.message}
                  </div>
                )}
              </div>

              {/* Key Features (ReactQuill controlled) */}
              <div className="mb-3 col-md-6">
                <label className="form-label fw-semibold">Key Features</label>
                <Controller
                  name="key_features"
                  control={control}
                  rules={{
                    required: "Key features are required",
                    minLength: {
                      value: 10,
                      message: "At least 10 characters required",
                    },
                  }}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      className={`bg-white ${
                        errors.key_features ? "border border-danger" : ""
                      }`}
                      placeholder="Write section Key Features..."
                      style={{ minHeight: "200px" }}
                    />
                  )}
                />
                {errors.key_features && (
                  <div className="text-danger small mt-1">
                    {errors.key_features.message}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Add Brand"}
              </button>
              <button
                type="reset"
                className="btn btn-outline-secondary"
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
