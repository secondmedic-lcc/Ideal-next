/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { usePhotoGalleryHooks } from "@/hooks/admin/usePhotoGalleryHooks";

export default function AddPhotoGallery() {

    const { onSubmit, register, isLoading, errors, previewSrc } = usePhotoGalleryHooks();

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white p-3">
                    <h5 className="mb-0">Create Photo Gallery</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Photo Gallery Title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                    {...register("title", { required: "Photo Gallery title is required" })}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                            </div>


                            <div className="col-md-6 mb-3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <label className="form-label">Photo Gallery Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            {...register("image")}
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
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Photo Gallery"}
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
