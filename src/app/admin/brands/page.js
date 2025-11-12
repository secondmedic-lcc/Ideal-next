/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import swal from "sweetalert";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBrands, deleteBrand } from "@/services/admin/brandServices";
import { imageUrl } from "@/services/baseUrl"; // ✅ make sure this exists

const BrandsList = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch all brands
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  // ✅ Delete brand mutation
  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBrand(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal("Deleted!", result.message || "Brand deleted successfully", "success");
        queryClient.invalidateQueries(["brands"]); // refetch list
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Failed to delete brand", "error");
    },
  });

  // ✅ Handle delete with confirmation
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

  if (isLoading) return <div className="container mt-4">Loading brands...</div>;
  if (isError) return <div className="container mt-4 text-danger">Failed to load brands.</div>;

  const brandsList = data?.data?.list || data?.list || [];

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-white d-flex justify-content-between align-items-center p-3">
          <h5 className="mb-0">Manage Brands List</h5>
          <Link href="/admin/brands/add" className="btn btn-primary text-white btn-sm">
            + Add New Brand
          </Link>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Logo</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {brandsList.length > 0 ? (
                  brandsList.map((brand, index) => (
                    <tr key={brand.id}>
                      <td>{index + 1}</td>
                      <td>{brand.title}</td>
                      <td>
                        {brand.brand_logo ? (
                          <img
                            src={`${imageUrl}${brand.brand_logo}`}
                            alt={brand.title}
                            style={{
                              width: "80px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        ) : (
                          <span className="text-muted small">No Image</span>
                        )}
                      </td>
                      <td>
                        <small className="text-muted">
                          {brand.small_description?.substring(0, 60)}...
                        </small>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            href={`/admin/brands/${brand.id}`} 
                            className="btn btn-sm btn-primary text-white"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            disabled={isDeleting}
                            onClick={() => handleDelete(brand.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No brands found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsList;
