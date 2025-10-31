"use client";
import React from "react";

export default function Header() {
    return (
        <nav className="navbar navbar-light bg-light px-4 shadow-sm">
            <span className="navbar-brand mb-0 h1">Admin Panel</span>
            <div>
                <button className="btn btn-outline-primary me-2">Notifications</button>
                <button className="btn btn-primary">Logout</button>
            </div>
        </nav>
    );
}
