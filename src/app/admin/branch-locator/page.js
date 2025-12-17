"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBranchLocators,
  deleteBranchLocator,
} from "@/services/admin/branchLocatorServices";
import Link from "next/link";
import swal from "sweetalert";
import {
  FiMapPin,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function BranchLocatorList() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["branch-locators"],
    queryFn: () => getBranchLocators({ page: 1, limit: 100 }),
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBranchLocator(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal(
          "Deleted!",
          result.message || "Branch deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["branch-locators"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Failed to delete branch", "error");
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This branch will be permanently deleted!",
      icon: "warning",
      buttons: ["Cancel", "Yes, Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) deleteMutate(id);
    });
  };

  if (isLoading) {
    return <div className="admin-page">Loading branches…</div>;
  }

  if (isError) {
    return (
      <div className="admin-page text-danger">Failed to load branches.</div>
    );
  }

  const branchList = data?.data?.list || data?.list || [];

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiMapPin size={18} />
            <h5 className="admin-card-title">Branch Locator</h5>
          </div>

          <Link href="/admin/branch-locator/add" className="theme-btn">
            <FiPlusCircle />
            <span>Add Branch</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {branchList.length === 0 ? (
            <div className="admin-empty">No branches found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {branchList.map((branch, index) => (
                    <tr key={branch.id}>
                      <td>{index + 1}</td>

                      <td className="fw-medium">{branch.name}</td>

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <FiPhone />
                          {branch.contact}
                        </div>
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <FiMail />
                          {branch.email}
                        </div>
                      </td>

                      <td>{branch.state?.name || "-"}</td>

                      <td>{branch.city?.name || "-"}</td>

                      <td className="text-muted">
                        {branch.address?.substring(0, 60)}…
                      </td>

                      <td>
                        <span
                          className={
                            branch.status == 1
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
                          {branch.status == 1 ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="text-end">
                        <div className="admin-actions">
                          <Link
                            href={`/admin/branch-locator/${branch.id}`}
                            className="icon-btn edit"
                            title="Edit Branch"
                          >
                            <FiEdit />
                          </Link>

                          <button
                            type="button"
                            className="icon-btn delete"
                            disabled={isDeleting}
                            onClick={() => handleDelete(branch.id)}
                            title="Delete Branch"
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
