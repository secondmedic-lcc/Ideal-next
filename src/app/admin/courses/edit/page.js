/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
import { getCourseById, updateCourse } from "@/services/admin/courseService";
import { imageUrl } from "@/services/baseUrl";
import { useSearchParams } from "next/navigation";
import { FiEdit, FiImage, FiSave, FiRefreshCw } from "react-icons/fi";

/* Wrapper for suspense */
export default function Page() {
  return (
    <Suspense fallback={<div className="admin-page">Loading editor...</div>}>
      <EditCourse />
    </Suspense>
  );
}

export function EditCourse() {
  const searchParams = useSearchParams();
  const rawCourseId = searchParams?.get("course_id");
  const courseId = rawCourseId ? Number(rawCourseId) : null;

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [previewSrc, setPreviewSrc] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const readerRef = useRef(null);

  /* Fetch course */
  const {
    data: rawRes,
    isLoading: isLoadingCourse,
    isError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  /* Normalize API payload */
  const coursePayload = React.useMemo(() => {
    if (!rawRes) return null;
    if (rawRes.data && typeof rawRes.data === "object") return rawRes.data;
    if (rawRes.course && typeof rawRes.course === "object")
      return rawRes.course;
    return rawRes;
  }, [rawRes]);

  /* Set defaults */
  useEffect(() => {
    if (!coursePayload) return;

    const defaults = {
      course_name: coursePayload.course_name ?? "",
      course_title: coursePayload.course_title ?? "",
      course_description: coursePayload.course_description ?? "",
      course_about_title: coursePayload.course_about_title ?? "",
      course_about_desc: coursePayload.course_about_desc ?? "",
    };

    setInitialValues(defaults);
    reset(defaults);

    const image =
      coursePayload.course_image || coursePayload.course_about_image || null;

    setExistingImage(image ? `${imageUrl}${image}` : null);
  }, [coursePayload, reset]);

  /* Update mutation */
  const mutation = useMutation({
    mutationFn: (formData) => updateCourse(courseId, formData),
    onSuccess: (res) => {
      if (res?.status === true) {
        swal("Success", res.message || "Course updated", "success");
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      } else {
        swal("Error", res?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Network error", "error");
    },
  });

  /* Image preview */
  const watchedFile = watch("course_about_image");
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

  /* Submit */
  const onSubmit = async (values) => {
    if (!courseId) {
      swal("Error", "Invalid course id", "error");
      return;
    }

    const formData = new FormData();

    [
      "course_name",
      "course_title",
      "course_description",
      "course_about_title",
      "course_about_desc",
    ].forEach((f) => {
      if (values[f]) formData.append(f, values[f]);
    });

    if (values.course_about_image?.length > 0) {
      formData.append("course_about_image", values.course_about_image[0]);
    }

    mutation.mutate(formData);
  };

  /* Reset */
  const handleReset = () => {
    if (initialValues) reset(initialValues);
    setPreviewSrc(null);
  };

  /* Guards */
  if (!courseId)
    return <div className="admin-page text-danger">Invalid course ID.</div>;

  if (isLoadingCourse)
    return <div className="admin-page">Loading course...</div>;

  if (isError)
    return <div className="admin-page text-danger">Failed to load course.</div>;

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiEdit size={18} />
            <h5 className="admin-card-title">Edit Course</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                    minLength: { value: 3, message: "At least 3 characters" },
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

              {/* Description */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Course Description</label>
                <textarea
                  rows="4"
                  className={`form-control ${
                    errors.course_description ? "is-invalid" : ""
                  }`}
                  {...register("course_description", {
                    required: "Course description is required",
                    minLength: { value: 10, message: "At least 10 characters" },
                  })}
                />
                {errors.course_description && (
                  <div className="invalid-feedback">
                    {errors.course_description.message}
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="col-md-6 mb-3">
                <label className="form-label d-flex align-items-center gap-2">
                  <FiImage /> Course Image (Replace)
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  {...register("course_about_image")}
                />

                <div className="mt-2">
                  {previewSrc ? (
                    <>
                      <small className="text-muted">New Preview:</small>
                      <div className="image-preview">
                        <img src={previewSrc} alt="preview" />
                      </div>
                    </>
                  ) : existingImage ? (
                    <>
                      <small className="text-muted">Existing Image:</small>
                      <div className="image-preview">
                        <img src={existingImage} alt="existing" />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* About Title */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Course About Title</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.course_about_title ? "is-invalid" : ""
                  }`}
                  {...register("course_about_title", {
                    required: "Course about title is required",
                  })}
                />
                {errors.course_about_title && (
                  <div className="invalid-feedback">
                    {errors.course_about_title.message}
                  </div>
                )}
              </div>

              {/* About Desc */}
              <div className="col-12 mb-3">
                <label className="form-label">Course About Description</label>
                <textarea
                  rows="3"
                  className={`form-control ${
                    errors.course_about_desc ? "is-invalid" : ""
                  }`}
                  {...register("course_about_desc", {
                    required: "About description is required",
                    minLength: { value: 10, message: "At least 10 characters" },
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
                disabled={mutation.isLoading || isSubmitting}
              >
                <FiSave />
                {mutation.isLoading || isSubmitting
                  ? "Updating..."
                  : "Update Course"}
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
}
