"use client";

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { useCourseSections, useDeleteCourseSection } from "@/hooks/admin/useCourseSectionHooks";
import swal from "sweetalert";
import Link from "next/link";

export default function CourseSectionsLis() {
    return (
        <>
            <Suspense fallback={<div className="container mt-4">Loading Editor...</div>}>
                <SectionsList />
            </Suspense>
        </>
    )
}


export const SectionsList = () => {
    const searchParams = useSearchParams();
    const rawCourseId = searchParams?.get("course_id");
    const courseId = rawCourseId ? Number(rawCourseId) : null;

    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError, isFetching } = useCourseSections({
        page,
        limit,
        ...(courseId ? { course_id: courseId } : {}),
    });

    const deleteMutation = useDeleteCourseSection();

    const handleDelete = (id) => {
        swal({
            title: "Delete this section?",
            text: "This will mark the section as inactive.",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteMutation.mutate(id);
            }
        });
    };

    const list = data?.data?.list || [];
    const total = data?.data?.total || 0;
    const totalPages = data?.data?.total_pages || 1;

    return (
        <div className="enhanced-card p-4 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center">
                <div className="card-header bg-white d-flex justify-content-between align-items-center p-3">
                    <h5 className="mb-0">Course Sections List</h5>
                    <Link href={`/admin/course-sections/add?course_id=${courseId}`} className="btn btn-primary text-white btn-sm">
                        + Add Course Sections
                    </Link>
                </div>
            </div>

            <div className="card-body-modern mt-4">
                {/* Table */}
                {isLoading || isFetching ? (
                    <div className="p-4 text-center text-gray-500">Loading sections...</div>
                ) : isError ? (
                    <div className="p-4 text-center text-red-500">Failed to load sections.</div>
                ) : list.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No sections found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-sm vendors-table-modern table-bordered w-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium">#</th>
                                    <th className="px-4 py-2 text-left font-medium">Title</th>
                                    <th className="px-4 py-2 text-left font-medium">Course</th>
                                    <th className="px-4 py-2 text-left font-medium">Created</th>
                                    <th className="px-4 py-2 text-center font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((sec, idx) => (
                                    <tr key={sec.id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">{(page - 1) * limit + idx + 1}</td>
                                        <td className="px-4 py-2">{sec.title}</td>
                                        <td className="px-4 py-2">{sec.courses?.course_name || "—"}</td>
                                        <td className="px-4 py-2 text-gray-500">
                                            {new Date(sec.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleDelete(sec.id)}
                                                className="btn btn-danger text-sm px-3 py-1"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 gap-2">
                        <button
                            className="btn-modern btn-outline-modern px-3 py-1"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Prev
                        </button>
                        <span className="text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="btn-modern btn-outline-modern px-3 py-1"
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
