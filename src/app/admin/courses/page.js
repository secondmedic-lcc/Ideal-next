/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourses, deleteCourse } from "@/services/admin/courseService";
import { imageUrl } from "@/services/baseUrl";
import Link from "next/link";
import swal from "sweetalert";
import {
  FiEdit,
  FiTrash2,
  FiPlusCircle,
  FiBookOpen,
} from "react-icons/fi";

export default function CourseList() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses({ page: 1, limit: 100 }),
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteCourse(id),
    onSuccess: (result) => {
      if (result?.status) {
        swal("Deleted!", result.message || "Course deleted successfully", "success");
        queryClient.invalidateQueries(["courses"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Failed to delete course", "error");
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

  if (isLoading) return <div className="admin-page">Loading courses...</div>;
  if (isError) return <div className="admin-page text-danger">Failed to load courses.</div>;

  const courseList = data?.data?.list || data?.list || [];

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiBookOpen size={18} />
            <h5 className="admin-card-title">Courses</h5>
          </div>

          <Link href="/admin/courses/add" className="theme-btn">
            <FiPlusCircle size={16} />
            <span>Add Course</span>
          </Link>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {courseList.length === 0 ? (
            <div className="admin-empty">No courses found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>About</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {courseList.map((course, index) => (
                    <tr key={course.id}>
                      <td>{index + 1}</td>

                      <td>
                        {course.course_about_image ? (
                          <img
                            src={`${imageUrl}${course.course_about_image}`}
                            alt={course.course_name}
                            className="admin-table-image"
                          />
                        ) : (
                          <span className="text-muted small">No Image</span>
                        )}
                      </td>

                      <td className="fw-medium">{course.course_name}</td>
                      <td>{course.course_title}</td>

                      <td>
                        <span className="admin-muted">
                          {course.course_description?.substring(0, 60)}…
                        </span>
                      </td>

                      <td>
                        <span className="admin-muted">
                          {course.course_about_title}
                        </span>
                      </td>

                      <td className="text-end">
                        <div className="admin-actions">
                          <Link
                            href={`/admin/courses/edit?course_id=${course.id}`}
                            className="icon-btn edit"
                            title="Edit Course"
                          >
                            <FiEdit />
                          </Link>

                          <Link
                            href={`/admin/course-sections?course_id=${course.id}&course_name=${encodeURIComponent(course.course_name || "")}`}
                            className="icon-btn add"
                            title="Add Sections"
                          >
                            <FiPlusCircle />
                          </Link>

                          <button
                            type="button"
                            className="icon-btn delete"
                            disabled={isDeleting}
                            onClick={() => handleDelete(course.id)}
                            title="Delete Course"
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
        </div>
      </div>
    </div>
  );
}
