"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdmissionRequest } from "@/services/admissionEnquiryServices";
import {
  FiUsers,
  FiUser,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const AdmissionEnquiry = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["admission-request", page],
    queryFn: () => getAdmissionRequest({ page }),
    keepPreviousData: true,
  });

  const requestList = data?.data?.list || [];
  const totalPages = data?.data?.total_pages || 1;
  const currentPage = data?.data?.current_page || 1;

  if (isLoading) {
    return <div className="admin-page">Loading admission enquiries…</div>;
  }

  if (error) {
    return (
      <div className="admin-page text-danger">
        Failed to load admission enquiries.
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiUsers size={18} />
            <h5 className="admin-card-title">
              Admission Enquiries
            </h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {requestList.length === 0 ? (
            <div className="admin-empty">
              No admission enquiries found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Student</th>
                    <th>Parent</th>
                    <th>Contact</th>
                    <th>Relation</th>
                    <th>Division</th>
                    <th>Applying For</th>
                  </tr>
                </thead>

                <tbody>
                  {requestList.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {(currentPage - 1) * 10 +
                          index +
                          1}
                      </td>

                      <td className="fw-medium">
                        <div className="d-flex align-items-center gap-2">
                          <FiUser />
                          {item.child_fname}{" "}
                          {item.child_lname}
                        </div>
                      </td>

                      <td>{item.parent_name}</td>

                      <td>
                        <div className="small">
                          <div className="d-flex align-items-center gap-2">
                            <FiMail />
                            {item.email}
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <FiPhone />
                            {item.contact}
                          </div>
                        </div>
                      </td>

                      <td>{item.relation}</td>                    

                      <td className="fw-medium">
                        <div className="d-flex align-items-center gap-2">
                          <FiBookOpen />
                          {item.division_name}
                        </div>
                      </td>
                      <td className="fw-medium">
                        <div className="d-flex align-items-center gap-2">
                          <FiBookOpen />
                          {item.apply_for}
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
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <FiChevronLeft />
                Prev
              </button>

              <span className="admin-pagination-text">
                Page {currentPage} of {totalPages}
                {isFetching && " loading…"}
              </span>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquiry;
