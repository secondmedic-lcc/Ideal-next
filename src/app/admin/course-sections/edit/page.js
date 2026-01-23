"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import swal from "sweetalert";
import { Button, Form } from "react-bootstrap";

import { useCourseSection } from "@/hooks/admin/useCourseSectionHooks";
import { updateCourseSection } from "@/services/admin/courseSectionService";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function EditInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = Number(searchParams.get("id") || 0);
  const courseId = Number(searchParams.get("course_id") || 0);
  const courseName = decodeURIComponent(searchParams.get("course_name") || "");

  // single fetch
  const { data, isLoading, isError } = useCourseSection(id);

  // API response shape safe
  const row =
    data?.data?.row ||
    data?.data?.details ||
    data?.data ||
    data?.data?.list?.[0] ||
    null;

  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  // reset snapshot
  const initialRef = useRef({ title: "", description: "" });

  // ✅ Quill first navigation empty bug fix: force remount after hydrate
  const [quillKey, setQuillKey] = useState(0);

  // hydrate when row arrives (every id change)
  useEffect(() => {
    if (!row?.id) return;

    const next = {
      title: row?.title || "",
      description: row?.description || "",
    };

    setForm(next);
    initialRef.current = next;

    // force quill to take initial value immediately (no reload needed)
    setQuillKey((k) => k + 1);
  }, [row?.id]);

  const goBackUrl = useMemo(() => {
    const q = new URLSearchParams();
    if (courseId) q.set("course_id", String(courseId));
    if (courseName) q.set("course_name", encodeURIComponent(courseName));
    return `/admin/course-sections?${q.toString()}`;
  }, [courseId, courseName]);

  const handleReset = () => {
    setForm(initialRef.current);
    setQuillKey((k) => k + 1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      return swal("Invalid ID", "Section ID is missing or invalid.", "error");
    }

    const payload = {
      title: (form.title || "").trim(),
      description: form.description || "",
      status: 1,
      ...(courseId ? { course_id: courseId } : {}),
    };

    try {
      setLoading(true);

      // ✅ debug
      console.log("UPDATE PAYLOAD =>", payload);

      const res = await updateCourseSection(id, payload);

      if (!res?.status) throw new Error(res?.message || "Update failed");

      swal("Success", res?.message || "Section updated successfully", "success").then(
        () => router.push(goBackUrl)
      );
    } catch (err) {
      swal("Update Failed", err?.message || "Failed to update section.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div className="admin-page">Loading…</div>;
  if (isError) return <div className="admin-page text-danger">Failed to load.</div>;
  if (!row?.id) return <div className="admin-page">No data found.</div>;

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <h5 className="admin-card-title">
            Edit Course Section
            {courseName ? (
              <span className="ms-2 badge bg-light text-dark border">{courseName}</span>
            ) : null}
          </h5>

          <Button variant="outline-secondary" onClick={() => router.push(goBackUrl)}>
            Back
          </Button>
        </div>

        <div className="admin-card-body">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Section Title</Form.Label>
              <Form.Control
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Enter section title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>

              {/* ✅ key -> forces remount so value shows even after redirect */}
              <ReactQuill
                key={quillKey}
                theme="snow"
                value={form.description || ""}
                onChange={(val) => setForm((p) => ({ ...p, description: val }))}
                placeholder="Write section description..."
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Section"}
              </Button>

              <Button type="button" variant="secondary" onClick={handleReset} disabled={loading}>
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default function CourseSectionEditPage() {
  return (
    <Suspense fallback={<div className="admin-page">Loading…</div>}>
      <EditInner />
    </Suspense>
  );
}
