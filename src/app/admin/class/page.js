"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFaqs, deleteFaqs } from "@/services/admin/classServices";
import Link from "next/link";
import swal from "sweetalert";
import {
  FiHelpCircle,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiMessageSquare,
} from "react-icons/fi";

export default function FAQList() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["class"],
    queryFn: () => getFaqs(),
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteFaqs(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal(
          "Deleted!",
          result.message || "Item deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["academic_year"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal(
        "Error",
        err?.message || "Failed to delete",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This item will be permanently deleted!",
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
    return <div className="admin-page">Loading Data…</div>;
  }

  if (isError) {
    return (
      <div className="admin-page text-danger">
        Failed to load Data.
      </div>
    );
  }

  const faqList = data?.data?.list || data?.list || [];

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiHelpCircle size={18} />
            <h5 className="admin-card-title">Class List</h5>
          </div>

          <Link
            href="/admin/class/add"
            className="theme-btn"
          >
            <FiPlusCircle />
            <span>Add Data</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {faqList.length === 0 ? (
            <div className="admin-empty">
              No Data Found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Title</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {faqList.map((faq, index) => (
                    <tr key={faq.id}>
                      <td>{index + 1}</td>

                      <td className="fw-medium">
                        {faq.title}
                      </td>

                      <td className="text-end">
                        <div className="admin-actions">
                          <Link
                            href={`/admin/class/${faq.id}`}
                            className="icon-btn edit"
                            title="Edit"
                          >
                            <FiEdit />
                          </Link>

                          <button
                            type="button"
                            className="icon-btn delete"
                            disabled={isDeleting}
                            onClick={() =>
                              handleDelete(faq.id)
                            }
                            title="Delete"
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
