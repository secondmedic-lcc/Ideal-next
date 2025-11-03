/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useCourseForm } from "@/hooks/admin/useCourseForm";

export default function AddCourses() {

    const { onSubmit, register, isLoading, errors, previewSrc } = useCourseForm();

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white p-3">
                    <h5 className="mb-0">Create Course</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Course Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.course_name ? "is-invalid" : ""}`}
                                    {...register("course_name", { required: "Course name is required", minLength: { value: 3, message: "At least 3 characters" } })}
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
                                    {...register("course_description", { required: "Course description is required", minLength: { value: 10, message: "At least 10 characters" } })}
                                />
                                {errors.course_description && <div className="invalid-feedback">{errors.course_description.message}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <label className="form-label">Course Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            {...register("course_about_image")}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        {previewSrc && (
                                            <div className="mt-2">
                                                <div>
                                                    <img src={previewSrc} alt="preview" style={{ maxWidth: "160px", maxHeight: "100px" }} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Course About</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.course_about_title ? "is-invalid" : ""}`}
                                    {...register("course_about_title", { required: "Course title is required" })}
                                />
                                {errors.course_about_title && <div className="invalid-feedback">{errors.course_about_title.message}</div>}
                            </div>

                            <div className="col-12 mb-3">
                                <label className="form-label">Course About Description</label>
                                <textarea
                                    rows="3"
                                    className={`form-control ${errors.course_about_desc ? "is-invalid" : ""}`}
                                    {...register("course_about_desc", { required: "About description is required", minLength: { value: 10, message: "At least 10 characters" } })}
                                />
                                {errors.course_about_desc && <div className="invalid-feedback">{errors.course_about_desc.message}</div>}
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Course"}
                            </button>
                            <button type="reset" className="btn btn-outline-secondary" onClick={() => { }}>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
