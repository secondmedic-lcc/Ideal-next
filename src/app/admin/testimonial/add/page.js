/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FiImage, FiUpload, FiSave, FiRefreshCw } from "react-icons/fi";
import { useTestimonialHooks } from "@/hooks/admin/useTestimonialHooks";

export default function AddPhotoGallery() {
  const { onSubmit, register, isLoading, errors, previewSrc } =
    useTestimonialHooks();

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiImage size={18} />
            <h5 className="admin-card-title">Create Testimonial</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={onSubmit} encType="multipart/form-data">
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
                disabled={isLoading}
              >
                <FiSave />
                {isLoading ? "Saving..." : "Save Testimonial"}
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
