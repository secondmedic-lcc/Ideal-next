"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [pagesOpen, setPagesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/img/logo.png"
            alt="logo"
            className="admin-logo"
            width={800}
            height={200}
          />
        </Link>
      </div>

      <nav className="sidebar-nav">
        <Link
          href="/admin/dashboard"
          className={`sidebar-link ${
            pathname === "/admin/dashboard" ? "active" : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/admin/courses"
          className={`sidebar-link ${
            pathname === "/admin/courses" ? "active" : ""
          }`}
        >
          Courses
        </Link>

        <Link
          href="/admin/gallery-video"
          className={`sidebar-link ${
            pathname === "/admin/gallery-video" ? "active" : ""
          }`}
        >
          Gallery Video
        </Link>

        <Link
          href="/admin/photo-gallery"
          className={`sidebar-link ${
            pathname === "/admin/photo-gallery" ? "active" : ""
          }`}
        >
          Photo Gallery
        </Link>

        <Link
          href="/admin/contact-us"
          className={`sidebar-link ${
            pathname === "/admin/contact-us" ? "active" : ""
          }`}
        >
          Contact Requests
        </Link>

        <Link
          href="/admin/admission-request"
          className={`sidebar-link ${
            pathname === "/admin/admission-request" ? "active" : ""
          }`}
        >
          Admission Enquiries
        </Link>

        <Link
          href="/admin/job-openings"
          className={`sidebar-link ${
            pathname === "/admin/job-openings" ? "active" : ""
          }`}
        >
          Job Openings
        </Link>

        <Link
          href="/admin/faqs"
          className={`sidebar-link ${
            pathname === "/admin/faqs" ? "active" : ""
          }`}
        >
          Manage FAQs
        </Link>

        <Link
          href="/admin/brands"
          className={`sidebar-link ${
            pathname === "/admin/brands" ? "active" : ""
          }`}
        >
          Manage Brands
        </Link>

        {/* <div className="sidebar-divider" /> */}

        {/* Dropdown */}
        <button
          className={`sidebar-link sidebar-dropdown ${pagesOpen ? "open" : ""}`}
          onClick={() => setPagesOpen(!pagesOpen)}
        >
          <span>Manage Pages</span>
          <span className="dropdown-arrow">▾</span>
        </button>

        <div className={`sidebar-submenu ${pagesOpen ? "show" : ""}`}>
          <Link
            href="/admin/page-content/about-us"
            className={`sidebar-sublink ${
              pathname === "/admin/page-content/about-us" ? "active" : ""
            }`}
          >
            About Us
          </Link>

          <Link
            href="/admin/page-content/online-learning"
            className={`sidebar-sublink ${
              pathname === "/admin/page-content/online-learning" ? "active" : ""
            }`}
          >
            Online Learning
          </Link>

          <Link
            href="/admin/page-content/csr"
            className={`sidebar-sublink ${
              pathname === "/admin/page-content/csr" ? "active" : ""
            }`}
          >
            CSR
          </Link>

          <Link
            href="/admin/page-content/social-commitment"
            className={`sidebar-sublink ${
              pathname === "/admin/page-content/social-commitment"
                ? "active"
                : ""
            }`}
          >
            Social Commitment
          </Link>

          <Link
            href="/admin/page-content/journey"
            className={`sidebar-sublink ${
              pathname === "/admin/page-content/journey" ? "active" : ""
            }`}
          >
            Journey
          </Link>

          <Link
            href="/admin/branch-locator"
            className={`sidebar-sublink ${
              pathname === "/admin/branch-locator" ? "active" : ""
            }`}
          >
            Branch Locator
          </Link>
        </div>
      </nav>
    </aside>
  );
}
