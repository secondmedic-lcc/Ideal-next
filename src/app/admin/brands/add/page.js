/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import { useBrandHooks } from "@/hooks/admin/useBrandHooks";
import {
  FiLayers,
  FiImage,
  FiFileText,
  FiList,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";

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
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiLayers size={18} />
            <h5 className="admin-card-title">Add Brand</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="row">
              {/* Brand Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Brand Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.title ? "is-invalid" : ""
                  }`}
                  {...register("title", {
                    required: "Brand name is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                  })}
                />
                {errors.title && (
                  <div className="invalid-feedback">
                    {errors.title.message}
                  </div>
                )}
              </div>

              {/* Brand Subtitle */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Brand Subtitle
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.subtitle ? "is-invalid" : ""
                  }`}
                  {...register("subtitle", {
                    required: "Brand subtitle is required",
                    minLength: { value: 3, message: "At least 3 characters" },
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
                    required: "Brand description is required",
                    minLength: {
                      value: 10,
                      message: "At least 10 characters",
                    },
                  })}
                />
                {errors.small_description && (
                  <div className="invalid-feedback">
                    {errors.small_description.message}
                  </div>
                )}
              </div>

              {/* Brand Logo */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Brand Logo
                </label>
                <div className="d-flex gap-3 align-items-start">
                  <input
                    type="file"
                    className="form-control"
                    {...register("brand_logo")}
                    accept="image/*"
                  />

                  {previewSrc ? (
                    <img
                      src={previewSrc}
                      alt="Preview"
                      className="rounded"
                      style={{
                        width: "90px",
                        height: "60px",
                        objectFit: "contain",
                        background: "#f8fafc",
                        padding: "6px",
                      }}
                    />
                  ) : (
                    <div className="text-muted d-flex align-items-center gap-2">
                      <FiImage />
                      <span>No preview</span>
                    </div>
                  )}
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
                        errors.long_description
                          ? "border border-danger"
                          : ""
                      }`}
                      placeholder="Write brand long description..."
                      style={{ minHeight: "180px" }}
                    />
                  )}
                />
                {errors.long_description && (
                  <div className="text-danger small mt-1">
                    {errors.long_description.message}
                  </div>
                )}
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
                        errors.key_features
                          ? "border border-danger"
                          : ""
                      }`}
                      placeholder="Write key features..."
                      style={{ minHeight: "180px" }}
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

            {/* Actions */}
            <div className="admin-form-actions">
              <button
                type="submit"
                className="theme-btn"
                disabled={isLoading}
              >
                <FiSave />
                {isLoading ? "Saving..." : "Add Brand"}
              </button>

              <button
                type="button"
                className="theme-btn btn-danger"
                onClick={() => reset()}
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
}
