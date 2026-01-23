"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import {
  useCourseSections,
  useDeleteCourseSection,
  useUpdateCourseSection,
} from "@/hooks/admin/useCourseSectionHooks";
import swal from "sweetalert";
import Link from "next/link";
import { Modal, Button, Form } from "react-bootstrap";
import {
  FiLayers,
  FiPlusCircle,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
} from "react-icons/fi";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import { useRouter } from "next/navigation";




export default function CourseSectionsLis() {
  return (
    <Suspense fallback={<div className="admin-page">Loading sections…</div>}>
      <SectionsList />
    </Suspense>
  );
}

export const SectionsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCourseName = searchParams?.get("course_name");
  const courseName = rawCourseName ? decodeURIComponent(rawCourseName) : "";
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
  const updateMutation = useUpdateCourseSection();

  // -------------------------
  // EDIT MODAL STATE
  // -------------------------
  const [showEdit, setShowEdit] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  const openEdit = (row) => {
    setEditRow(row);
    setForm({
      title: row?.title || "",
      description: row?.description || "",
    });
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setEditRow(null);
    setForm({ title: "", description: "" });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    if (!editRow?.id) return;

    updateMutation.mutate(
      {
        id: editRow.id,
        payload: {
          ...(courseId ? { course_id: Number(courseId) } : {}),
          title: form.title,
          description: form.description,
          status: 1,
        },
      },
      {
        onSuccess: (res) => {
          if (res?.status) {
            swal("Updated!", res?.message || "Section updated", "success");
            closeEdit();
          } else {
            swal("Error", res?.message || "Update failed", "error");
          }
        },
        onError: (err) => {
          swal("Error", err?.message || "Update failed", "error");
        },
      }
    );
  };

  // -------------------------
  // DELETE
  // -------------------------
  const handleDelete = (id) => {
    swal({
      title: "Delete this section?",
      text: "This will permanently delete the section.",
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
            <h5 className="admin-card-title">
              Course Sections
              {courseName ? (
                <span className="ms-2 badge bg-light text-dark border">
                  {courseName}
                </span>
              ) : null}
            </h5>
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
                        {sec.created_at
                          ? new Date(sec.created_at).toLocaleDateString()
                          : "—"}
                      </td>

                      <td className="text-end">
                        <div className="admin-actions justify-content-end">
                          {/* EDIT */}
                          <button
                            className="icon-btn edit"
                            title="Edit Section"
                            onClick={() => {
                              window.location.href = `/admin/course-sections/edit?id=${sec.id}&course_id=${courseId}&course_name=${encodeURIComponent(courseName)}`;
                            }}
                          >
                            <FiEdit />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(sec.id)}
                            className="icon-btn delete"
                            title="Delete Section"
                            disabled={deleteMutation.isLoading}
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

      {/* EDIT MODAL */}
      <Modal show={showEdit} onHide={closeEdit} centered backdrop="static">
        <Form onSubmit={submitEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Section</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Section Title</Form.Label>
              <Form.Control
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Enter section title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-0">
              <Form.Label>Description</Form.Label>

               <ReactQuill
                theme="snow"
                value={form.description || ""}   // ✅ always string
                onChange={(val) => setForm((p) => ({ ...p, description: val }))}
                placeholder="Write section description..."
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              type="button"
              onClick={closeEdit}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>

            <Button variant="primary" type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Updating..." : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
