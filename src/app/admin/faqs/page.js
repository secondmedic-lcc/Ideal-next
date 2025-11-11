"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFaqs, deleteFaqs } from "@/services/admin/faqsServices";
import Link from "next/link";
import swal from "sweetalert";

export default function FAQList() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["faqs"],
        queryFn: () => getFaqs(),
    });

    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: (id) => deleteFaqs(id),
        onSuccess: (result) => {
            if (result?.status) {
                swal("Deleted!", result.message || "FAQs deleted successfully", "success");
                queryClient.invalidateQueries(["faqs"]);
            } else {
                swal("Error", result?.message || "Something went wrong", "error");
            }
        },
        onError: (err) => {
            swal("Error", err?.message || "Failed to delete FAQs", "error");
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
        return <div className="container mt-4">Loading FAQs...</div>;
    }

    if (isError) {
        return <div className="container mt-4 text-danger">Failed to load FAQs.</div>;
    }

    const faqList = data?.data?.list || data?.list || [];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">FAQs List</h5>
                    <Link href="/admin/faqs/add" className="btn btn-primary text-white btn-sm">
                        + Add FAQs
                    </Link>
                </div>

                <div className="card-body">
                    {faqList.length === 0 ? (
                        <div className="text-center py-4">No FAQs found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "60px" }}>#</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th style={{ width: "150px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faqList.map((faq, index) => (
                                        <tr key={faq.id}>
                                            <td>{index + 1}</td>
                                            <td>{faq.title}</td>
                                            <td>{faq.description}</td>

                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link
                                                        href={`/admin/faqs/${faq.id}`}
                                                        className="btn btn-sm btn-primary text-white"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(faq.id)}
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
