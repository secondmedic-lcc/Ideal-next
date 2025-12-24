"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGalleryVideo } from "@/hooks/admin/useGalleryVideo";
import { FiVideo, FiLink, FiSave } from "react-icons/fi";

const AddGalleryVideo = () => {
  const { categoryId } = useParams(); // 👈 from URL
  const { handleSubmit, mutate, register } = useGalleryVideo();

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiVideo size={18} />
            <h5 className="admin-card-title">Add Gallery Video</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form
            onSubmit={handleSubmit((data) =>
              mutate({
                ...data,
                video_category_id: Number(categoryId), // ✅ FROM URL
              })
            )}
          >
            <div className="row">
              {/* Video Title */}
              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiVideo />
                  Video Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter video title"
                  {...register("title")}
                />
              </div>

              {/* Video Link */}
              <div className="col-md-12 mb-4">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiLink />
                  Video Link
                </label>
                <textarea
                  rows={3}
                  className="form-control"
                  placeholder="Paste video URL here"
                  {...register("link")}
                />
              </div>

              {/* Actions */}
              <div className="col-md-12">
                <div className="admin-form-actions">
                  <button type="submit" className="theme-btn">
                    <FiSave />
                    Upload Video
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGalleryVideo;
