"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdmissionRequest } from "@/services/admissionEnquiryServices";

const AdmissionEnquiry = () => {
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["admission-request", page],
        queryFn: () => getAdmissionRequest({ page }),
        keepPreviousData: true,
    });

    const requestList = data?.data?.list || [];
    const totalPages = data?.data?.total_pages || 1;
    const currentPage = data?.data?.current_page || 1;

    if (isLoading) {
        return <p>Loading admission enquiries...</p>;
    }

    if (error) {
        return <p>Failed to load data</p>;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        Manage Admission Request
                    </div>

                    <div className="card-body">
                        {requestList.length === 0 ? (
                            <p>No admission enquiries found</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Name</th>
                                            <th>Parent</th>
                                            <th>Contact</th>
                                            <th>Relation</th>
                                            <th>Request For</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {requestList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{(currentPage - 1) * 10 + index + 1}</td>
                                                <td>
                                                    {item.child_fname} {item.child_lname}
                                                </td>
                                                <td>{item.parent_name}</td>
                                                <td>
                                                    {item.email}
                                                    <br />
                                                    {item.contact}
                                                </td>
                                                <td>{item.relation}</td>
                                                <td>{item.apply_for}</td>
                                                <td>-</td>
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

export default AdmissionEnquiry;
