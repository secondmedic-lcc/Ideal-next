"use client";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FiUsers, FiBookOpen } from "react-icons/fi";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/* Page Header */}
      <div className="dashboard-header">
        <h2>Welcome back, Admin</h2>
        <p>Here’s an overview of your platform activity.</p>
      </div>

      {/* Stats Cards */}
      <Row className="dashboard-stats">
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="dashboard-card-content">
                <div className="dashboard-icon blue">
                  <FiUsers size={22} />
                </div>
                <div>
                  <h6 className="dashboard-card-title">
                    Admission Enquiries
                  </h6>
                  <p className="dashboard-card-value">87</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="dashboard-card-content">
                <div className="dashboard-icon green">
                  <FiBookOpen size={22} />
                </div>
                <div>
                  <h6 className="dashboard-card-title">Total Courses</h6>
                  <p className="dashboard-card-value">32</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
