/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourses, deleteCourse } from "@/services/admin/courseService";
import { imageUrl } from "@/services/baseUrl";
import Link from "next/link";
import swal from "sweetalert";

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

    if (isLoading) {
        return <div className="container mt-4">Loading courses...</div>;
    }

    if (isError) {
        return <div className="container mt-4 text-danger">Failed to load courses.</div>;
    }

    const courseList = data?.data?.list || data?.list || [];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white d-flex justify-content-between align-items-center p-3">
                    <h5 className="mb-0">Course List</h5>
                    <Link href="/admin/courses/add" className="btn btn-primary text-white btn-sm">
                        + Add New Course
                    </Link>
                </div>

                <div className="card-body">
                    {courseList.length === 0 ? (
                        <div className="text-center py-4">No courses found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "60px" }}>#</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>About</th>
                                        <th style={{ width: "150px" }}>Actions</th>
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
                                                        style={{
                                                            width: "80px",
                                                            height: "60px",
                                                            objectFit: "cover",
                                                            borderRadius: "6px",
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-muted small">No Image</span>
                                                )}
                                            </td>
                                            <td>{course.course_name}</td>
                                            <td>{course.course_title}</td>
                                            <td>
                                                <small className="text-muted">
                                                    {course.course_description?.substring(0, 60)}...
                                                </small>
                                            </td>
                                            <td>
                                                <small className="text-muted">
                                                    {course.course_about_title}
                                                </small>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link
                                                        href={`/admin/courses/edit?course_id=${course.id}`}
                                                        className="btn btn-sm btn-primary text-white"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link href={`/admin/course-sections?course_id=${course.id}`} className="btn btn-sm btn-warning">
                                                        Add
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(course.id)}
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
