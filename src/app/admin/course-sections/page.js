"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import {
  useCourseSections,
  useDeleteCourseSection,
} from "@/hooks/admin/useCourseSectionHooks";
import swal from "sweetalert";
import Link from "next/link";
import {
  FiLayers,
  FiPlusCircle,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function CourseSectionsLis() {
  return (
    <Suspense fallback={<div className="admin-page">Loading sections…</div>}>
      <SectionsList />
    </Suspense>
  );
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
  const totalPages = data?.data?.total_pages || 1;

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiLayers size={18} />
            <h5 className="admin-card-title">Course Sections</h5>
          </div>

          <Link
            href={`/admin/course-sections/add?course_id=${courseId}`}
            className="theme-btn"
          >
            <FiPlusCircle size={16} />
            <span>Add Section</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {isLoading || isFetching ? (
            <div className="admin-empty">Loading sections…</div>
          ) : isError ? (
            <div className="admin-empty text-danger">
              Failed to load sections.
            </div>
          ) : list.length === 0 ? (
            <div className="admin-empty">No sections found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Course</th>
                    <th>Created</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((sec, idx) => (
                    <tr key={sec.id}>
                      <td>{(page - 1) * limit + idx + 1}</td>
                      <td className="fw-medium">{sec.title}</td>
                      <td>{sec.courses?.course_name || "—"}</td>
                      <td className="admin-muted">
                        {new Date(sec.created_at).toLocaleDateString()}
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => handleDelete(sec.id)}
                          className="icon-btn delete ms-auto"
                          title="Delete Section"
                          disabled={deleteMutation.isLoading}
                        >
                          <FiTrash2 />
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
            <div className="admin-pagination">
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <FiChevronLeft />
                Prev
              </button>

              <span className="admin-pagination-info">
                Page {page} of {totalPages}
              </span>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={page >= totalPages}
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
