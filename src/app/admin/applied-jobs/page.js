"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppliedJobRequest } from "@/services/careerServices";
import {
  FiBriefcase,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiClock,
} from "react-icons/fi";

const AppliedJobRequest = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["job-apply-request", page],
    queryFn: () => getAppliedJobRequest({ page }),
    keepPreviousData: true,
  });

  const requestList = data?.data?.list || [];
  const totalPages = data?.data?.total_pages || 1;
  const currentPage = data?.data?.current_page || 1;

  if (isLoading) {
    return <div className="admin-page">Loading job applications…</div>;
  }

  if (error) {
    return (
      <div className="admin-page text-danger">
        Failed to load job applications.
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiBriefcase size={18} />
            <h5 className="admin-card-title">Job Applications</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {requestList.length === 0 ? (
            <div className="admin-empty">
              No job applications found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Job Title</th>
                    <th>Category</th>
                    <th>Applicant</th>
                    <th>Preferred Branch</th>
                    <th>Resume</th>
                    <th>Applied At</th>
                  </tr>
                </thead>

                <tbody>
                  {requestList.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {(currentPage - 1) * 10 + index + 1}
                      </td>

                      <td className="fw-medium">
                        {item.jobOpening?.title || "—"}
                      </td>

                      <td>{item.category}</td>

                      <td>
                        <div className="d-flex flex-column gap-1">
                          <span className="d-flex align-items-center gap-2">
                            <FiMail />
                            {item.email}
                          </span>
                          <span className="d-flex align-items-center gap-2 text-muted">
                            <FiPhone />
                            {item.contact}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="d-flex align-items-center gap-2">
                          <FiMapPin />
                          {item.preferred_branch}
                        </span>
                      </td>

                      <td>
                        {item.resume ? (
                          <a
                            href={`http://43.205.3.238:3047/uploads/documents/${item.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-inline-flex align-items-center gap-2"
                          >
                            <FiFileText />
                            View Resume
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td className="text-muted">
                        <div className="d-flex align-items-center gap-2">
                          <FiClock />
                          {new Date(item.created_at).toLocaleString(
                            "en-IN",
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="admin-pagination">
              <button
                className="btn btn-outline-primary btn-sm"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>

              <span className="text-sm">
                Page {currentPage} of {totalPages}
                {isFetching && " loading…"}
              </span>

              <button
                className="btn btn-outline-primary btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobRequest;
