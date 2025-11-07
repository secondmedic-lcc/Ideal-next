"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/admin-login");
    };

    return (
        <nav className="navbar navbar-light bg-light px-4 shadow-sm">
            <span className="navbar-brand mb-0 h1">Admin Panel</span>
            <div>
                {/* <button className="btn btn-outline-primary me-2">Notifications</button> */}
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </div>
        </nav>
    );
}
