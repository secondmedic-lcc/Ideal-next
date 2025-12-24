/* eslint-disable @next/next/no-img-element */
"use client";

import React, { Suspense } from "react";
import { usePhotosListHooks } from "@/hooks/admin/usePhotosListHooks";
import { useSearchParams } from "next/navigation";
import PhotosList from "./PhotosList";
import { FiImage, FiUpload, FiSave, FiRefreshCw } from "react-icons/fi";

export default function AddPhotosList() {
  return (
    <Suspense fallback={<div className="admin-page">Loading editor…</div>}>
      <AllPhotosList />
    </Suspense>
  );
}

export function AllPhotosList() {
  const searchParams = useSearchParams();
  const photoGalleryId = searchParams?.get("photo_gallery_id");

  const { onSubmit, register, isLoading, errors, previewSrc } =
    usePhotosListHooks();

  return (
    <div className="admin-page">
      {/* Upload Card */}
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiImage size={18} />
            <h5 className="admin-card-title">Upload Photos</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={onSubmit} encType="multipart/form-data">
            {/* Hidden gallery id */}
            <input
              type="hidden"
              {...register("photo_gallery_id")}
              name="photo_gallery_id"
              defaultValue={photoGalleryId || ""}
            />

            <div className="row">
              {/* Photo Title */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Photo Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Enter photo title"
                  {...register("title", {
                    required: "Photo title is required",
                  })}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>

              {/* Image Upload */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiUpload />
                  Photo Image
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
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button
                type="submit"
                className="theme-btn"
                disabled={isLoading}
              >
                <FiSave />
                {isLoading ? "Saving..." : "Save Photo"}
              </button>

              <button type="reset" className="theme-btn btn-danger">
                <FiRefreshCw />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Photos List */}
      <PhotosList photoGalleryId={photoGalleryId} />
    </div>
  );
}
