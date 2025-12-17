"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getJobOpenings,
  deleteJobOpening,
} from "@/services/admin/jobOpeningService";
import Link from "next/link";
import swal from "sweetalert";
import {
  FiBriefcase,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiMail,
} from "react-icons/fi";

export default function JobOpeningsList() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job-opening"],
    queryFn: () => getJobOpenings(),
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteJobOpening(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal(
          "Deleted!",
          result.message || "Job opening deleted successfully",
          "success"
        );
        queryClient.invalidateQueries(["job-opening"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal(
        "Error",
        err?.message || "Failed to delete job opening",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "This job opening will be permanently deleted!",
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
    return <div className="admin-page">Loading job openings…</div>;
  }

  if (isError) {
    return (
      <div className="admin-page text-danger">
        Failed to load job openings.
      </div>
    );
  }

  const jobOpeningList = data?.data?.list || data?.list || [];

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiBriefcase size={18} />
            <h5 className="admin-card-title">Job Openings</h5>
          </div>

          <Link
            href="/admin/job-openings/add"
            className="theme-btn"
          >
            <FiPlusCircle />
            <span>Add Job</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {jobOpeningList.length === 0 ? (
            <div className="admin-empty">
              No job openings found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Title</th>
                    <th>Apply Email</th>
                    <th>Description</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {jobOpeningList.map((job, index) => (
                    <tr key={job.id}>
                      <td>{index + 1}</td>

                      <td className="fw-medium">
                        {job.title}
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <FiMail />
                          {job.apply_mail}
                        </div>
                      </td>

                      <td className="text-muted">
                        {job.description}
                      </td>

                      <td className="text-end">
                        <div className="admin-actions">
                          <Link
                            href={`/admin/job-openings/${job.id}`}
                            className="icon-btn edit"
                            title="Edit Job"
                          >
                            <FiEdit />
                          </Link>

                          <button
                            type="button"
                            className="icon-btn delete"
                            disabled={isDeleting}
                            onClick={() =>
                              handleDelete(job.id)
                            }
                            title="Delete Job"
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
