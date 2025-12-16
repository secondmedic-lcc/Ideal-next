"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGalleryVideos,
  deleteGalleryVideo,
} from "@/services/admin/galleryVideoService";
import Link from "next/link";
import swal from "sweetalert";
import { FiVideo, FiPlusCircle, FiTrash2 } from "react-icons/fi";

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
        swal(
          "Deleted!",
          result.message || "Gallery video deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["gallery-video"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Failed to delete gallery video", "error");
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This video will be permanently deleted!",
      icon: "warning",
      buttons: ["Cancel", "Yes, Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMutate(id);
      }
    });
  };

  if (isLoading)
    return <div className="admin-page">Loading gallery videos…</div>;

  if (isError)
    return (
      <div className="admin-page text-danger">
        Failed to load gallery videos.
      </div>
    );

  const galleryVideoList = data?.data?.list || data?.list || [];

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiVideo size={18} />
            <h5 className="admin-card-title">Gallery Videos</h5>
          </div>

          <Link
            href="/admin/gallery-video/add"
            className="theme-btn"
          >
            <FiPlusCircle size={16} />
            <span>Add Video</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {galleryVideoList.length === 0 ? (
            <div className="admin-empty">No gallery videos found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Title</th>
                    <th>Video Link</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {galleryVideoList.map((video, index) => (
                    <tr key={video.id}>
                      <td>{index + 1}</td>
                      <td className="fw-medium">{video.title}</td>
                      <td>
                        <a
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          {video.link}
                        </a>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="icon-btn delete ms-auto"
                          disabled={isDeleting}
                          onClick={() => handleDelete(video.id)}
                          title="Delete Video"
                        >
                          <FiTrash2 />
                        </button>
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
