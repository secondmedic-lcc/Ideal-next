"use client";
import React from "react";

export default function AdminDashboard() {
    return (
        <div className="p-4">
            <h2 className="fw-bold">Welcome to Admin Dashboard</h2>
            <p>Here’s Admin overview and stats.</p>

            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Admission Enquiry</h5>
                            <p className="card-text fs-4">87</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Total Courses</h5>
                            <p className="card-text fs-4">32</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
