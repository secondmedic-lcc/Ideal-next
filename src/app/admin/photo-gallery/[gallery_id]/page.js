/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";

import {
    getPhotoGalleryById,
    updatePhotoGallery,
} from "@/services/admin/photoGalleryServices";
import { imageUrl } from "@/services/baseUrl";

export default function EditPhotoGallery() {
    const { gallery_id } = useParams();
    const router = useRouter();
    const qc = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            image: null,
        },
    });

    const [previewSrc, setPreviewSrc] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(null);

    const { data, isLoading: isFetching, isError } = useQuery({
        queryKey: ["photo-gallery", gallery_id],
        queryFn: () => getPhotoGalleryById(gallery_id),
        enabled: !!gallery_id,
    });

    useEffect(() => {
        if (!data) return;

        const item =
            (data && data.data) ||
            (data && data.data && data.data.data) ||
            (data && data.data && Array.isArray(data.data.list) && data.data.list[0]) ||
            data;

        if (!item) return;

        const normalized =
            item.data && typeof item.data === "object" ? item.data :
                item;

        const title = normalized.title ?? normalized.name ?? "";
        const image = normalized.image ?? null;

        reset({ title, image: null });

        const imgUrl = typeof image === "string" && image.startsWith("http")
            ? image
            : image
                ? `${imageUrl}${image}`
                : null;

        setExistingImageUrl(imgUrl);
        setPreviewSrc(null);
        setValue("title", title);
    }, [data, reset, setValue]);

    // eslint-disable-next-line react-hooks/incompatible-library
    const watchedFile = watch("image");

    useEffect(() => {
        if (watchedFile && watchedFile.length > 0) {
            const file = watchedFile[0];
            const reader = new FileReader();
            reader.onload = (e) => setPreviewSrc(e.target.result);
            reader.readAsDataURL(file);
            return () => {
                reader.onload = null;
            };
        } else {
            setPreviewSrc(null);
        }
    }, [watchedFile]);

    // mutation also using v5 object signature
    const mutation = useMutation({
        mutationFn: ({ gallery_id: gid, formData }) => updatePhotoGallery(gid, formData),
        onSuccess: (res) => {
            if (res?.status === true) {
                swal("Success", res.message || "Photo gallery updated", "success").then(() => {
                    qc.invalidateQueries({ queryKey: ["photo-gallery"] });
                    qc.invalidateQueries({ queryKey: ["photo-gallery", gallery_id] });
                    router.push("/admin/photo-gallery");
                });
            } else {
                const msg = res?.message || res?.msg || "Update failed";
                swal("Error", msg, "error");
            }
        },
        onError: (err) => {
            swal("Error", err?.message || "Network or server error", "error");
        },
    });

    const onSubmit = (values) => {
        const formData = new FormData();
        if (values.title) formData.append("title", values.title);
        if (values.slug) formData.append("slug", values.slug);

        if (values.image && values.image.length > 0) {
            formData.append("image", values.image[0]);
        }

        mutation.mutate({ gallery_id, formData });
    };

    if (isFetching) {
        return <div className="container mt-4">Loading photo data...</div>;
    }

    if (isError) {
        return <div className="container mt-4 text-danger">Failed to load photo data.</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white p-3">
                    <h5 className="mb-0">Edit Photo Gallery</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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

                            <div className="col-md-8 mb-3">
                                <label className="form-label">Photo Gallery Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    {...register("image")}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label d-block">Preview</label>

                                {previewSrc ? (
                                    <div className="mt-2">
                                        <img src={previewSrc} alt="preview" style={{ maxWidth: "160px", maxHeight: "100px" }} />
                                        <div className="small text-muted mt-1">New image preview</div>
                                    </div>
                                ) : existingImageUrl ? (
                                    <div className="mt-2">
                                        <img src={existingImageUrl} alt="existing" style={{ maxWidth: "160px", maxHeight: "100px" }} />
                                    </div>
                                ) : (
                                    <div style={{ width: 160, height: 100, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}>
                                        No image
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={mutation.isLoading}>
                                {mutation.isLoading ? "Saving..." : "Update Photo Gallery"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    const item =
                                        (data && data.data) ||
                                        (data && data.data && data.data.data) ||
                                        (data && data.data && Array.isArray(data.data.list) && data.data.list[0]) ||
                                        data;

                                    const normalized =
                                        item && item.data && typeof item.data === "object" ? item.data : item;

                                    if (normalized) {
                                        reset({ title: normalized.title || "", slug: normalized.slug || "", image: null });
                                        const imgUrl = typeof normalized.image === "string" && normalized.image.startsWith("http") ? normalized.image : normalized.image ? `/uploads/${normalized.image}` : null;
                                        setExistingImageUrl(imgUrl);
                                        setPreviewSrc(null);
                                    } else {
                                        reset();
                                        setExistingImageUrl(null);
                                        setPreviewSrc(null);
                                    }
                                }}
                            >
                                Reset
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary ms-auto"
                                onClick={() => router.push("/admin/photo-gallery")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
