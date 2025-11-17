"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBranchLocators } from "@/services/admin/branchLocatorServices";
import { deleteBranchLocator } from "@/services/admin/branchLocatorServices";
import Link from "next/link";
import swal from "sweetalert";

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
                swal("Deleted!", result.message || "Branch deleted successfully", "success");
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

    if (isLoading) return <div className="container mt-4">Loading...</div>;
    if (isError) return <div className="container mt-4 text-danger">Failed to load data.</div>;

    const branchList = data?.data?.list || data?.list || [];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Branch Locator List</h5>
                    <Link href="/admin/branch-locator/add" className="btn btn-sm btn-primary text-white">
                        + Add New Branch
                    </Link>
                </div>

                <div className="card-body">
                    {branchList.length === 0 ? (
                        <div className="text-center py-4">No branches found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "60px" }}>#</th>
                                        <th>Name</th>
                                        <th>Contact</th>
                                        <th>Email</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                        <th style={{ width: "150px" }}>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {branchList.map((branch, index) => (
                                        <tr key={branch.id}>
                                            <td>{index + 1}</td>
                                            <td>{branch.name}</td>
                                            <td>{branch.contact}</td>
                                            <td>{branch.email}</td>
                                            <td>{branch.state?.name || "-"}</td>
                                            <td>{branch.city?.name || "-"}</td>
                                            <td>
                                                <small className="text-muted">
                                                    {branch.address?.substring(0, 60)}...
                                                </small>
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
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link
                                                        href={`/admin/branch-locator/${branch.id}`}
                                                        className="btn btn-sm btn-primary text-white"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(branch.id)}
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
