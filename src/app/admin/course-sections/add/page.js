"use client";

import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCreateCourseSection } from "@/hooks/admin/useCourseSectionHooks";
import { getCourseById } from "@/services/admin/courseService";
import swal from "sweetalert";
import {
  FiLayers,
  FiBookOpen,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CourseSectionAddForm() {
  return (
    <Suspense fallback={<div className="admin-page">Loading editor…</div>}>
      <AddSections />
    </Suspense>
  );
}

export function AddSections() {
  /* Load Quill CSS on client */
  useEffect(() => {
    import("react-quill-new/dist/quill.snow.css").catch(() => {});
  }, []);

  const searchParams = useSearchParams();
  const rawCourseId = searchParams?.get("course_id");
  const courseId = rawCourseId ? Number(rawCourseId) : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      course_id: courseId,
      title: "",
      description: "",
      status: 1,
    },
  });

  /* Fetch course details */
  const {
    data: coursesRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  const courseDetails = coursesRes?.data;

  const createMutation = useCreateCourseSection({
    onSuccess: async (res) => {
      if (res?.status) {
        await swal(
          "Success",
          res.message || "Section created successfully",
          "success"
        );
        reset();
      } else {
        await swal(
          "Error",
          res?.message || "Unable to create section",
          "error"
        );
      }
    },
  });

  const description = watch("description");

  const onQuillChange = (val) => {
    setValue("description", val, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (values) => {
    const payload = {
      course_id: Number(courseId),
      title: values.title?.trim(),
      description: values.description?.trim(),
    };

    createMutation.mutate(payload);
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiLayers size={18} />
            <h5 className="admin-card-title">Add Course Section</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Hidden course id */}
            <input type="hidden" {...register("course_id")} />

            {/* Course */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-flex align-items-center gap-2">
                <FiBookOpen /> Course
              </label>

              {isLoading ? (
                <div className="form-control bg-light">
                  Loading course…
                </div>
              ) : isError ? (
                <div className="form-control bg-light text-danger">
                  Failed to load course.
                </div>
              ) : (
                <input
                  type="text"
                  className="form-control bg-light"
                  value={courseDetails?.course_name || ""}
                  readOnly
                />
              )}
            </div>

            {/* Section Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Section Title
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.title ? "is-invalid" : ""
                }`}
                {...register("title", {
                  required: "Section title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                  maxLength: {
                    value: 255,
                    message: "Title is too long",
                  },
                })}
                placeholder="Enter section title"
              />
              {errors.title && (
                <div className="invalid-feedback">
                  {errors.title.message}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Description
              </label>

              <ReactQuill
                theme="snow"
                value={description}
                onChange={onQuillChange}
                className={`bg-white ${
                  errors.description ? "border border-danger" : ""
                }`}
                placeholder="Write section description..."
              />

              {errors.description && (
                <div className="text-danger small mt-1">
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button
                type="submit"
                disabled={
                  createMutation.isLoading || isSubmitting
                }
                className="theme-btn"
              >
                <FiSave />
                {createMutation.isLoading
                  ? "Saving..."
                  : "Create Section"}
              </button>

              <button
                type="button"
                onClick={() => reset()}
                disabled={createMutation.isLoading}
                className="theme-btn btn-danger"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>

            {/* Error */}
            {createMutation.isError && (
              <div className="text-danger small mt-3">
                {createMutation.error?.message ||
                  "Failed to create section. Please try again."}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
