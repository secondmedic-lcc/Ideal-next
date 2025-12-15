"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import "./admin.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!user && !hasToken) {
      router.push("/admin-login");
    }
  }, [router, user]);

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
