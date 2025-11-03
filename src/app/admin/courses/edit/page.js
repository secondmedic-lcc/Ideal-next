/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
import { getCourseById, updateCourse } from "@/services/admin/courseService";
import { imageUrl } from "@/services/baseUrl";
import { useSearchParams } from "next/navigation";

export default function Page() {
    return (
        <Suspense fallback={<div className="container mt-4">Loading editor...</div>}>
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

    // fetch course (v5 object form)
    const { data: rawRes, isLoading: isLoadingCourse, isError } = useQuery({
        queryKey: ["course", courseId],
        queryFn: () => getCourseById(courseId),
        enabled: !!courseId,
    });

    // Normalize payload (support {status,data:{...}} and plain {...})
    const coursePayload = React.useMemo(() => {
        if (!rawRes) return null;
        // if API returns { status, data: { ... } } or { data: { ... } }
        if (rawRes.data && typeof rawRes.data === "object") return rawRes.data;
        // sometimes API returns { status: true, course: {...} } or others
        if (rawRes.course && typeof rawRes.course === "object") return rawRes.course;
        // else assume rawRes is the payload itself
        return rawRes;
    }, [rawRes]);

    // When coursePayload changes, reset form and set existing image
    useEffect(() => {
        if (!coursePayload) return;
        const defaults = {
            course_name: coursePayload.course_name ?? coursePayload.name ?? "",
            course_title: coursePayload.course_title ?? coursePayload.title ?? "",
            course_description: coursePayload.course_description ?? coursePayload.description ?? "",
            course_about_title: coursePayload.course_about_title ?? coursePayload.about_title ?? "",
            course_about_desc: coursePayload.course_about_desc ?? coursePayload.about_desc ?? "",
        };

        setInitialValues(defaults);
        reset(defaults);

        // choose image field from payload (try common keys)
        const imageFile =
            coursePayload.course_image ??
            coursePayload.course_about_image ??
            coursePayload.image ??
            coursePayload.photo ??
            null;

        if (imageFile) {
            setExistingImage(`${imageUrl}${imageFile}`);
        } else {
            setExistingImage(null);
        }
    }, [coursePayload, reset]);

    // mutation (v5)
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

    // watch file input for preview
    const watchedFile = watch("course_about_image");
    useEffect(() => {
        if (readerRef.current) {
            try {
                readerRef.current.onload = null;
            } catch (e) { }
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

    const onSubmit = async (values) => {
        if (!courseId) {
            swal("Error", "Invalid course id", "error");
            return;
        }

        try {
            const formData = new FormData();

            const fields = [
                "course_name",
                "course_title",
                "course_description",
                "course_about_title",
                "course_about_desc",
            ];

            fields.forEach((f) => {
                if (values[f] !== undefined && values[f] !== null && values[f] !== "") {
                    formData.append(f, values[f]);
                }
            });

            if (values.course_about_image && values.course_about_image.length > 0) {
                formData.append("course_about_image", values.course_about_image[0]);
            }

            mutation.mutate(formData);
        } catch (err) {
            swal("Error", err?.message || "Unable to submit form", "error");
        }
    };

    const handleReset = () => {
        if (initialValues) reset(initialValues);
        else reset();
        setPreviewSrc(null);
    };

    if (!courseId) {
        return (
            <div className="container mt-4 text-danger">
                Invalid or missing <strong>course_id</strong> in URL.
            </div>
        );
    }

    if (isLoadingCourse) return <div className="container mt-4">Loading course...</div>;
    if (isError) return <div className="container mt-4 text-danger">Failed to load course.</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white p-3">
                    <h5 className="mb-0">Edit Course</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Course Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.course_name ? "is-invalid" : ""}`}
                                    {...register("course_name", {
                                        required: "Course name is required",
                                        minLength: { value: 3, message: "At least 3 characters" },
                                    })}
                                />
                                {errors.course_name && <div className="invalid-feedback">{errors.course_name.message}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Course Title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.course_title ? "is-invalid" : ""}`}
                                    {...register("course_title", { required: "Course title is required" })}
                                />
                                {errors.course_title && <div className="invalid-feedback">{errors.course_title.message}</div>}
                            </div>

                            <div className="col-6 mb-3">
                                <label className="form-label">Course Description</label>
                                <textarea
                                    rows="4"
                                    className={`form-control ${errors.course_description ? "is-invalid" : ""}`}
                                    {...register("course_description", {
                                        required: "Course description is required",
                                        minLength: { value: 10, message: "At least 10 characters" },
                                    })}
                                />
                                {errors.course_description && <div className="invalid-feedback">{errors.course_description.message}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <label className="form-label">Course Image (replace)</label>
                                        <input type="file" className="form-control" accept="image/*" {...register("course_about_image")} />
                                        <small className="text-muted">Upload a new image to replace the existing one.</small>
                                    </div>

                                    <div className="col-md-4">
                                        {previewSrc ? (
                                            <div className="mt-2">
                                                <small className="text-muted">New Preview:</small>
                                                <div>
                                                    <img src={previewSrc} alt="preview" style={{ maxWidth: "160px", maxHeight: "100px" }} />
                                                </div>
                                            </div>
                                        ) : existingImage ? (
                                            <div className="mt-2">
                                                <small className="text-muted">Existing Image:</small>
                                                <div>
                                                    <img src={existingImage} alt="existing" style={{ maxWidth: "160px", maxHeight: "100px" }} />
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Course About</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.course_about_title ? "is-invalid" : ""}`}
                                    {...register("course_about_title", { required: "Course about title is required" })}
                                />
                                {errors.course_about_title && <div className="invalid-feedback">{errors.course_about_title.message}</div>}
                            </div>

                            <div className="col-12 mb-3">
                                <label className="form-label">Course About Description</label>
                                <textarea
                                    rows="3"
                                    className={`form-control ${errors.course_about_desc ? "is-invalid" : ""}`}
                                    {...register("course_about_desc", {
                                        required: "About description is required",
                                        minLength: { value: 10, message: "At least 10 characters" },
                                    })}
                                />
                                {errors.course_about_desc && <div className="invalid-feedback">{errors.course_about_desc.message}</div>}
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={mutation.isLoading || isSubmitting}>
                                {mutation.isLoading || isSubmitting ? "Updating..." : "Update Course"}
                            </button>
                            <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
