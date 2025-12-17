/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import swal from "sweetalert";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBrands, deleteBrand } from "@/services/admin/brandServices";
import { imageUrl } from "@/services/baseUrl";
import {
  FiLayers,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiImage,
} from "react-icons/fi";

const BrandsList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBrand(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal(
          "Deleted!",
          result.message || "Brand deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["brands"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Failed to delete brand", "error");
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This brand will be permanently deleted!",
      icon: "warning",
      buttons: ["Cancel", "Yes, Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) deleteMutate(id);
    });
  };

  if (isLoading) {
    return <div className="admin-page">Loading brands…</div>;
  }

  if (isError) {
    return <div className="admin-page text-danger">Failed to load brands.</div>;
  }

  const brandsList = data?.data?.list || data?.list || [];

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiLayers size={18} />
            <h5 className="admin-card-title">Brands</h5>
          </div>

          <Link href="/admin/brands/add" className="theme-btn">
            <FiPlusCircle />
            <span>Add Brand</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {brandsList.length === 0 ? (
            <div className="admin-empty">No brands found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Brand Name</th>
                    <th>Logo</th>
                    <th>Description</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {brandsList.map((brand, index) => (
                    <tr key={brand.id}>
                      <td>{index + 1}</td>

                      <td className="fw-medium">{brand.title}</td>

                      <td>
                        {brand.brand_logo ? (
                          <img
                            src={`${imageUrl}${brand.brand_logo}`}
                            alt={brand.title}
                            className="rounded"
                            style={{
                              width: "80px",
                              height: "60px",
                              objectFit: "contain",
                              background: "#f8fafc",
                              padding: "6px",
                            }}
                          />
                        ) : (
                          <div className="d-flex align-items-center gap-2 text-muted">
                            <FiImage />
                            <span>No Image</span>
                          </div>
                        )}
                      </td>

                      <td className="text-muted">
                        {brand.small_description
                          ? brand.small_description.substring(0, 70) + "…"
                          : "—"}
                      </td>

                      <td className="text-end">
                        <div className="admin-actions">
                          <Link
                            href={`/admin/brands/${brand.id}`}
                            className="icon-btn edit"
                            title="Edit Brand"
                          >
                            <FiEdit />
                          </Link>

                          <button
                            type="button"
                            className="icon-btn delete"
                            disabled={isDeleting}
                            onClick={() => handleDelete(brand.id)}
                            title="Delete Brand"
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
};

export default BrandsList;
