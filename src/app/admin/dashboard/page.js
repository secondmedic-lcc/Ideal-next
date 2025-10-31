"use client";
import React from "react";

export default function AdminDashboard() {
    return (
        <div className="p-4">
            <h2>Welcome to your Dashboard</h2>
            <p>Here’s your overview and stats.</p>

            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Users</h5>
                            <p className="card-text fs-4">245</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Orders</h5>
                            <p className="card-text fs-4">87</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Revenue</h5>
                            <p className="card-text fs-4">$4,532</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
