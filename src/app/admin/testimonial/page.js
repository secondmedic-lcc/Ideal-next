/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPhotoGallery,
  deletePhotoGallery,
} from "@/services/admin/testimonialServices";
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

export default function TestimonialList() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonial"],
    queryFn: () => getPhotoGallery(),
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deletePhotoGallery(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal(
          "Deleted!",
          result.message || "testimonial deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["testimonial"]);
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
    return <div className="admin-page">Loading data…</div>;

  if (isError)
    return (
      <div className="admin-page text-danger">
        Failed to load data.
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
            <h5 className="admin-card-title">Testimonial</h5>
          </div>

          <Link
            href="/admin/testimonial/add"
            className="theme-btn"
          >
            <FiPlusCircle size={16} />
            <span>Add Testimonial</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {photoGalleryList.length === 0 ? (
            <div className="admin-empty">No data found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Image</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {photoGalleryList.map((gallery, index) => (
                    <tr key={gallery.id}>
                      <td>{index + 1}</td>

                      <td className="fw-medium">{gallery.name}</td>
                      <td className="fw-medium">{gallery.rating}</td>
                      <td className="fw-medium">{gallery.review}</td>

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
                            href={`/admin/testimonial/${gallery.id}`}
                            className="icon-btn edit"
                            title="Edit Testimonial"
                          >
                            <FiEdit />
                          </Link>

                          <button
                            type="button"
                            className="icon-btn delete"
                            disabled={isDeleting}
                            onClick={() => handleDelete(gallery.id)}
                            title="Delete Testimonial"
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
