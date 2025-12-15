"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const [pagesOpen, setPagesOpen] = useState(false);

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
        <Link href="/admin/dashboard" className="sidebar-link active">
          Dashboard
        </Link>

        <Link href="/admin/courses" className="sidebar-link">
          Courses
        </Link>

        <Link href="/admin/gallery-video" className="sidebar-link">
          Gallery Video
        </Link>

        <Link href="/admin/photo-gallery" className="sidebar-link">
          Photo Gallery
        </Link>

        <Link href="/admin/contact-us" className="sidebar-link">
          Contact Requests
        </Link>

        <Link href="/admin/admission-request" className="sidebar-link">
          Admission Enquiries
        </Link>

        <Link href="/admin/job-openings" className="sidebar-link">
          Job Openings
        </Link>

        <Link href="/admin/faqs" className="sidebar-link">
          Manage FAQs
        </Link>

        <Link href="/admin/brands" className="sidebar-link">
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
          <Link href="/admin/page-content/about-us" className="sidebar-sublink">
            About Us
          </Link>

          <Link
            href="/admin/page-content/online-learning"
            className="sidebar-sublink"
          >
            Online Learning
          </Link>

          <Link href="/admin/page-content/csr" className="sidebar-sublink">
            CSR
          </Link>

          <Link
            href="/admin/page-content/social-commitment"
            className="sidebar-sublink"
          >
            Social Commitment
          </Link>

          <Link href="/admin/page-content/journey" className="sidebar-sublink">
            Journey
          </Link>

          <Link href="/admin/branch-locator" className="sidebar-sublink">
            Branch Locator
          </Link>
        </div>
      </nav>
    </aside>
  );
}
