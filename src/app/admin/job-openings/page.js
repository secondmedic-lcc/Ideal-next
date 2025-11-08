"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobOpenings, deleteJobOpening } from "@/services/admin/jobOpeningService";
import Link from "next/link";
import swal from "sweetalert";

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
                swal("Deleted!", result.message || "Job Opening deleted successfully", "success");
                queryClient.invalidateQueries(["job-opening"]);
            } else {
                swal("Error", result?.message || "Something went wrong", "error");
            }
        },
        onError: (err) => {
            swal("Error", err?.message || "Failed to delete Job Opening", "error");
        },
    });

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "This course will be permanently deleted!",
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
        return <div className="container mt-4">Loading Job Opening...</div>;
    }

    if (isError) {
        return <div className="container mt-4 text-danger">Failed to load Job Opening.</div>;
    }

    const jobOpeningList = data?.data?.list || data?.list || [];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white d-flex justify-content-between align-items-center p-3">
                    <h5 className="mb-0">Job Opening List</h5>
                    <Link href="/admin/job-openings/add" className="btn btn-primary text-white btn-sm">
                        + Add Job
                    </Link>
                </div>

                <div className="card-body">
                    {jobOpeningList.length === 0 ? (
                        <div className="text-center py-4">No Job Opening found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "60px" }}>Sr.</th>
                                        <th>Title</th>
                                        <th>Mail</th>
                                        <th>Link</th>
                                        <th style={{ width: "150px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobOpeningList.map((jobData, index) => (
                                        <tr key={jobData.id}>
                                            <td>{index + 1}</td>
                                            <td>{jobData.title}</td>
                                            <td>{jobData.apply_mail}</td>
                                            <td>{jobData.description}</td>

                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link
                                                        href={`/admin/job-openings/${jobData.id}`}
                                                        className="btn btn-sm btn-primary text-white"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(jobData.id)}
                                                    >
                                                        Delete
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
