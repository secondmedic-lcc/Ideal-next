"use client";
import React from "react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white vh-100" style={{ width: "250px" }}>
            <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none text-center">
                <span className="fs-4">Admin Dashboard</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link href="/admin/dashboard" className="nav-link text-white active">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/admin/courses" className="nav-link text-white">
                        Courses
                    </Link>
                </li>
            </ul>
        </div>
    );
}
