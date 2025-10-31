"use client";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Sidebar from "./components/SideBar";

export default function AdminLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
