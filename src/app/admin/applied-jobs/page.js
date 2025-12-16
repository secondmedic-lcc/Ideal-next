"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppliedJobRequest } from "@/services/careerServices";

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

  if (isLoading) return <p>Loading job applications...</p>;
  if (error) return <p>Failed to load job applications</p>;

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">Manage Job Applications</div>

          <div className="card-body">
            {requestList.length === 0 ? (
              <p>No job applications found</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered" width="100%">
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Job Title</th>
                      <th>Category</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Preferred Branch</th>
                      <th>Resume</th>
                      <th>Applied At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {requestList.map((item, index) => (
                      <tr key={item.id}>
                        <td>{(currentPage - 1) * 10 + index + 1}</td>

                        <td>{item.jobOpening?.title || "-"}</td>

                        <td>{item.category}</td>

                        <td>{item.email}</td>

                        <td>{item.contact}</td>

                        <td>{item.preferred_branch}</td>

                        <td>
                          {item.resume ? (
                            <a
                              href={`http://43.205.3.238:3047/uploads/documents/${item.resume}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resume
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>

                        <td>
                          {new Date(item.created_at).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-4 gap-3">
                <button
                  className="btn btn-modern btn-outline-primary px-3 py-1"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </button>

                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                  {isFetching && " loading..."}
                </span>

                <button
                  className="btn btn-modern btn-outline-primary px-3 py-1"
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
    </div>
  );
};

export default AppliedJobRequest;
