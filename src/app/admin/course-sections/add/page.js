"use client";

import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCreateCourseSection } from "@/hooks/admin/useCourseSectionHooks";
import { getCourseById } from "@/services/admin/courseService";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function CourseSectionAddForm() {
    return (
        <Suspense fallback={<div className="container mt-4">Loading Editor...</div>}>
            <AddSections />
        </Suspense>
    );
}

export function AddSections() {
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

    const qc = useQueryClient();

    const { data: coursesRes, isLoading, isError } = useQuery({
        queryKey: ["courses", courseId],
        queryFn: () => getCourseById(courseId),
        enabled: !!courseId,
    });

    const coursesDetails = coursesRes?.data;

    const createMutation = useCreateCourseSection({
        onSuccess: async (res) => {
            if (res?.status) {
                await swal("Success", res.message || "Section created", "success");
                reset();
            } else {
                await swal("Error", res?.message || "Unable to create section", "error");
            }
        },
    });


    // eslint-disable-next-line react-hooks/incompatible-library
    const description = watch("description");

    const onSubmit = (values) => {
        const payload = {
            course_id: Number(courseId),
            title: values.title?.trim(),
            description: values.description?.trim(),
        };

        createMutation.mutate(payload);
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0 rounded-3">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Add Course Section</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                        {/* Hidden Course ID */}
                        <input type="hidden" {...register("course_id")} />

                        {/* Course Name */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Course</label>
                            {isLoading ? (
                                <div className="form-control bg-light">Loading course...</div>
                            ) : isError ? (
                                <div className="form-control bg-light text-danger">Failed to load course.</div>
                            ) : (
                                <input
                                    type="text"
                                    className="form-control bg-light"
                                    value={coursesDetails?.course_name || ""}
                                    readOnly
                                />
                            )}
                            {errors.course_id && (
                                <div className="text-danger small mt-1">{errors.course_id.message}</div>
                            )}
                        </div>

                        {/* Section Title */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Section Title</label>
                            <input
                                type="text"
                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                {...register("title", {
                                    required: "Section title is required",
                                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                                    maxLength: { value: 255, message: "Title is too long" },
                                })}
                                placeholder="Enter section title"
                            />
                            {errors.title && (
                                <div className="invalid-feedback">{errors.title.message}</div>
                            )}
                        </div>

                        {/* Description with ReactQuill */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Description</label>
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={(val) => setValue("description", val)}
                                className={`bg-white ${errors.description ? "border border-danger" : ""}`}
                                placeholder="Write section description..."
                                style={{ minHeight: "20px", }}
                            />
                            {errors.description && (
                                <div className="text-danger small mt-1">{errors.description.message}</div>
                            )}
                        </div>


                        {/* Buttons */}
                        <div className="d-flex gap-2 mt-4">
                            <button
                                type="submit"
                                disabled={createMutation.isLoading || isSubmitting}
                                className="btn btn-primary"
                            >
                                {createMutation.isLoading ? "Saving..." : "Create Section"}
                            </button>

                            <button
                                type="button"
                                onClick={() => reset()}
                                disabled={createMutation.isLoading}
                                className="btn btn-outline-secondary"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Error Message */}
                        {createMutation.isError && (
                            <div className="text-danger small mt-3">
                                {createMutation.error?.message || "Failed to create section. Please try again."}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
