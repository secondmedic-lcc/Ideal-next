/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPhotosList,
  deletePhotosList,
} from "@/services/admin/photosListService";
import swal from "sweetalert";
import { imageUrl } from "@/services/baseUrl";
import { FiImage, FiTrash2 } from "react-icons/fi";

export default function PhotosList({ photoGalleryId }) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos-list", photoGalleryId],
    queryFn: () => getPhotosList({ id: photoGalleryId }),
    enabled: !!photoGalleryId,
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deletePhotosList(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal(
          "Deleted!",
          result.message || "Photo deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["photos-list"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Failed to delete photo", "error");
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This photo will be permanently deleted!",
      icon: "warning",
      buttons: ["Cancel", "Yes, Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMutate(id);
      }
    });
  };

  if (isLoading) return <div className="admin-page">Loading photos…</div>;

  if (isError)
    return <div className="admin-page text-danger">Failed to load photos.</div>;

  const photoGalleryList = data?.data?.list || data?.list || [];

  return (
    <div className="admin-card mt-4">
      {/* Header */}
      <div className="admin-card-header">
        <div className="admin-card-title-wrap">
          <FiImage size={18} />
          <h5 className="admin-card-title">Photos List</h5>
        </div>
      </div>

      {/* Body */}
      <div className="admin-card-body">
        {photoGalleryList.length === 0 ? (
          <div className="admin-empty">No photos found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table admin-table align-middle">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {photoGalleryList.map((photo, index) => (
                  <tr key={photo.id}>
                    <td>{index + 1}</td>

                    <td className="fw-medium">{photo.title}</td>

                    <td>
                      <img
                        src={imageUrl + photo.image}
                        alt="Photo"
                        className="admin-table-image"
                      />
                    </td>

                    <td className="text-end">
                      <button
                        type="button"
                        className="icon-btn delete ms-auto"
                        disabled={isDeleting}
                        onClick={() => handleDelete(photo.id)}
                        title="Delete Photo"
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
  );
}
