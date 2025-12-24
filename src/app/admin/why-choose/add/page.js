/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FiImage, FiUpload, FiSave, FiRefreshCw } from "react-icons/fi";
import { useWhyChooseHooks } from "@/hooks/admin/useWhyChooseHooks";

export default function AddPhotoGallery() {
  const { onSubmit, register, isLoading, errors, previewSrc } =
    useWhyChooseHooks();

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiImage size={18} />
            <h5 className="admin-card-title">Create Item</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={onSubmit} encType="multipart/form-data">
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
                disabled={isLoading}
              >
                <FiSave />
                {isLoading ? "Saving..." : "Save"}
              </button>

              <button type="reset" className="theme-btn btn-danger">
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
