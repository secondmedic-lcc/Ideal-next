"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGalleryVideos, deleteGalleryVideo } from "@/services/admin/galleryVideoService";
import { imageUrl } from "@/services/baseUrl";
import Link from "next/link";
import swal from "sweetalert";

export default function GalleryVideoList() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["gallery-video"],
        queryFn: () => getGalleryVideos(),
    });

    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: (id) => deleteGalleryVideo(id),
        onSuccess: (result) => {
            if (result?.status) {
                swal("Deleted!", result.message || "Gallery Video deleted successfully", "success");
                queryClient.invalidateQueries(["gallery-video"]);
            } else {
                swal("Error", result?.message || "Something went wrong", "error");
            }
        },
        onError: (err) => {
            swal("Error", err?.message || "Failed to delete Gallery Video", "error");
        },
    });

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "This course will be permanently deleted!",
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
        return <div className="container mt-4">Loading Gallery Video...</div>;
    }

    if (isError) {
        return <div className="container mt-4 text-danger">Failed to load Gallery Video.</div>;
    }

    const galleryVideoList = data?.data?.list || data?.list || [];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white d-flex justify-content-between align-items-center p-3">
                    <h5 className="mb-0">Gallery Video List</h5>
                    <Link href="/admin/gallery-video/add" className="btn btn-primary text-white btn-sm">
                        + Add Video
                    </Link>
                </div>

                <div className="card-body">
                    {galleryVideoList.length === 0 ? (
                        <div className="text-center py-4">No Gallery Video found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "60px" }}>#</th>
                                        <th>Title</th>
                                        <th>Link</th>
                                        <th style={{ width: "150px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {galleryVideoList.map((video, index) => (
                                        <tr key={video.id}>
                                            <td>{index + 1}</td>
                                            <td>{video.title}</td>
                                            <td>{video.link}</td>

                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(video.id)}
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
