/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useCourseForm } from "@/hooks/admin/useCourseForm";
import {
  FiBookOpen,
  FiImage,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";

export default function AddCourses() {
  const { onSubmit, register, isLoading, errors, previewSrc } =
    useCourseForm();

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiBookOpen size={18} />
            <h5 className="admin-card-title">Create Course</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="row">
              {/* Course Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.course_name ? "is-invalid" : ""
                  }`}
                  {...register("course_name", {
                    required: "Course name is required",
                    minLength: {
                      value: 3,
                      message: "At least 3 characters",
                    },
                  })}
                />
                {errors.course_name && (
                  <div className="invalid-feedback">
                    {errors.course_name.message}
                  </div>
                )}
              </div>

              {/* Course Title */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Course Title</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.course_title ? "is-invalid" : ""
                  }`}
                  {...register("course_title", {
                    required: "Course title is required",
                  })}
                />
                {errors.course_title && (
                  <div className="invalid-feedback">
                    {errors.course_title.message}
                  </div>
                )}
              </div>

              {/* Course Description */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Course Description
                </label>
                <textarea
                  rows="4"
                  className={`form-control ${
                    errors.course_description ? "is-invalid" : ""
                  }`}
                  {...register("course_description", {
                    required: "Course description is required",
                    minLength: {
                      value: 10,
                      message: "At least 10 characters",
                    },
                  })}
                />
                {errors.course_description && (
                  <div className="invalid-feedback">
                    {errors.course_description.message}
                  </div>
                )}
              </div>

              {/* Course Image */}
              <div className="col-md-6 mb-3">
                <label className="form-label d-flex align-items-center gap-2">
                  <FiImage />
                  Course Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  {...register("course_about_image")}
                />

                {previewSrc && (
                  <div className="image-preview mt-2">
                    <img src={previewSrc} alt="preview" />
                  </div>
                )}
              </div>

              {/* Course About */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Course About Title
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.course_about_title ? "is-invalid" : ""
                  }`}
                  {...register("course_about_title", {
                    required: "Course title is required",
                  })}
                />
                {errors.course_about_title && (
                  <div className="invalid-feedback">
                    {errors.course_about_title.message}
                  </div>
                )}
              </div>

              {/* Course About Description */}
              <div className="col-12 mb-3">
                <label className="form-label">
                  Course About Description
                </label>
                <textarea
                  rows="3"
                  className={`form-control ${
                    errors.course_about_desc ? "is-invalid" : ""
                  }`}
                  {...register("course_about_desc", {
                    required: "About description is required",
                    minLength: {
                      value: 10,
                      message: "At least 10 characters",
                    },
                  })}
                />
                {errors.course_about_desc && (
                  <div className="invalid-feedback">
                    {errors.course_about_desc.message}
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
                {isLoading ? "Saving..." : "Save Course"}
              </button>

              <button
                type="reset"
                className="theme-btn btn-danger"
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
