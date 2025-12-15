"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Navbar, Container, Button } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/admin-login");
  };

  return (
    <Navbar className="admin-header" expand="lg">
      <Container fluid className="admin-header-inner">
        <Navbar.Brand className="admin-header-title">
          Admin Panel
        </Navbar.Brand>

        <div className="admin-header-actions">
          <Button
            onClick={handleLogout}
            className="theme-btn btn-danger"
            variant="primary"
          >
            <FiLogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
