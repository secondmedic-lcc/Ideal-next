/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPhotoGallery, deletePhotoGallery } from "@/services/admin/photoGalleryServices";
import Link from "next/link";
import swal from "sweetalert";
import { imageUrl } from "@/services/baseUrl";

export default function PhotoGalleryList() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["photo-gallery"],
        queryFn: () => getPhotoGallery(),
    });

    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: (id) => deletePhotoGallery(id),
        onSuccess: (result) => {
            if (result?.status) {
                swal("Deleted!", result.message || "Photo Gallery deleted successfully", "success");
                queryClient.invalidateQueries(["photo-gallery"]);
            } else {
                swal("Error", result?.message || "Something went wrong", "error");
            }
        },
        onError: (err) => {
            swal("Error", err?.message || "Failed to delete Photo Gallery", "error");
        },
    });

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "This Gallery will be permanently deleted!",
            icon: "warning",
            buttons: ["Cancel", "Yes, Delete"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteMutate(id);
            }
        });
    };

    if (isLoading) {
        return <div className="container mt-4">Loading Photo Gallery...</div>;
    }

    if (isError) {
        return <div className="container mt-4 text-danger">Failed to load Photo Gallery.</div>;
    }

    const photoGalleryList = data?.data?.list || data?.list || [];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white d-flex justify-content-between align-items-center p-3">
                    <h5 className="mb-0">Photo Gallery List</h5>
                    <Link href="/admin/photo-gallery/add" className="btn btn-primary text-white btn-sm">
                        + Add Photo
                    </Link>
                </div>

                <div className="card-body">
                    {photoGalleryList.length === 0 ? (
                        <div className="text-center py-4">No Photo Gallery found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "60px" }}>Sr.</th>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th style={{ width: "150px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {photoGalleryList.map((gallery, index) => (
                                        <tr key={gallery.id}>
                                            <td>{index + 1}</td>
                                            <td>{gallery.title}</td>
                                            <td>
                                                <img src={imageUrl + gallery.image} alt="Gallery Image" width={100} className="rounded" />
                                            </td>

                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link
                                                        href={`/admin/photo-gallery/${gallery.id}`}
                                                        className="btn btn-sm btn-primary text-white"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link href={`/admin/photo-gallery/photos-list?photo_gallery_id=${gallery.id}`} className="btn btn-sm btn-warning">
                                                        Add
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(gallery.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
