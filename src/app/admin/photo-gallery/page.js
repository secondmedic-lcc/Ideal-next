/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPhotoGallery,
  deletePhotoGallery,
} from "@/services/admin/photoGalleryServices";
import Link from "next/link";
import swal from "sweetalert";
import { imageUrl } from "@/services/baseUrl";
import {
  FiImage,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

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
        swal(
          "Deleted!",
          result.message || "Photo gallery deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["photo-gallery"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Failed to delete photo gallery", "error");
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This gallery will be permanently deleted!",
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
    return <div className="admin-page">Loading photo gallery…</div>;

  if (isError)
    return (
      <div className="admin-page text-danger">
        Failed to load photo gallery.
      </div>
    );

  const photoGalleryList = data?.data?.list || data?.list || [];

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiImage size={18} />
            <h5 className="admin-card-title">Photo Gallery</h5>
          </div>

          <Link
            href="/admin/photo-gallery/add"
            className="theme-btn"
          >
            <FiPlusCircle size={16} />
            <span>Add Photo Gallery</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {photoGalleryList.length === 0 ? (
            <div className="admin-empty">No photo gallery found.</div>
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
                  {photoGalleryList.map((gallery, index) => (
                    <tr key={gallery.id}>
                      <td>{index + 1}</td>

                      <td className="fw-medium">{gallery.title}</td>

                      <td>
                        <img
                          src={imageUrl + gallery.image}
                          alt="Gallery"
                          className="admin-table-image"
                        />
                      </td>

                      <td className="text-end">
                        <div className="admin-actions">
                          <Link
                            href={`/admin/photo-gallery/${gallery.id}`}
                            className="icon-btn edit"
                            title="Edit Gallery"
                          >
                            <FiEdit />
                          </Link>

                          <Link
                            href={`/admin/photo-gallery/photos-list?photo_gallery_id=${gallery.id}`}
                            className="icon-btn add"
                            title="Add Photos"
                          >
                            <MdOutlineAddPhotoAlternate />
                          </Link>

                          <button
                            type="button"
                            className="icon-btn delete"
                            disabled={isDeleting}
                            onClick={() => handleDelete(gallery.id)}
                            title="Delete Gallery"
                          >
                            <FiTrash2 />
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
