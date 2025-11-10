"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const branch = () => {
  return (
    <>
      <Header />

      <div className="heading">
        <h1 class="web-heading mb-0">
         Branch Locator 
        </h1>
      </div>
     <section className="store-locator-section section-padding">
        <Container>
          {/* Header */}
          <div className="store-locator-header">

            <Row className="align-items-center">
              <Col lg={4} md={6} sm={12}>
                <label className="store-locator-label">Select State</label>
                <select className="store-locator-select" defaultValue="Maharashtra">
                  <option>Maharashtra</option>
                  <option>Gujarat</option>
                  <option>Karnataka</option>
                </select>
              </Col>

              <Col lg={4} md={6} sm={12}>
                <label className="store-locator-label">Select City</label>
                <select className="store-locator-select" defaultValue="MUMBAI">
                  <option>MUMBAI</option>
                  <option>PUNE</option>
                  <option>NASHIK</option>
                </select>
              </Col>

              <Col lg={4} md={6} sm={12}>
                <label className="store-locator-label">Select Branch</label>
                <select className="store-locator-select" defaultValue="COMMERCE">
                  <option>Goregaon West</option>
                  <option>Borivali</option>
                  <option>Santacruz</option>
                </select>
              </Col>

            </Row>
          </div>
        

          {/* Result */}
          <Row className="store-locator-result">
            <Col lg={12}>
              <h3 className="store-locator-result-title">Result</h3>
              <hr className="store-locator-divider" />
              <div className="store-locator-total">Total Records Found : <strong>3</strong></div>

              <div className="store-locator-box">
                {/* Branch 1 */}
                <div className="store-locator-branch">
                  <div className="branch-index">1</div>
                  <div className="branch-content">
                    <div className="branch-title">'Goregaon West - HO'</div>
                    <div className="branch-meta">
                      <div><strong>Address:</strong> Uma- Smruti, 1st &amp; 2nd floor, Near Filmistan, S.V.Road.</div>
                      <div><strong>Contact:</strong> +91 022 28787553, 8422818110</div>
                      <div><strong>Email:</strong> goregaonwest@idealclasses.com</div>
                    </div>
                  </div>
                </div>

                {/* Branch 2 */}
                <div className="store-locator-branch">
                  <div className="branch-index">2</div>
                  <div className="branch-content">
                    <div className="branch-title">'Andheri Branch'</div>
                    <div className="branch-meta">
                      <div><strong>Address:</strong> XYZ Building, Andheri West</div>
                      <div><strong>Contact:</strong> +91 022 99999999</div>
                      <div><strong>Email:</strong> andheri@idealclasses.com</div>
                    </div>
                  </div>
                </div>

                {/* Branch 3 (example) */}
                <div className="store-locator-branch">
                  <div className="branch-index">3</div>
                  <div className="branch-content">
                    <div className="branch-title">'Dadar Center'</div>
                    <div className="branch-meta">
                      <div><strong>Address:</strong> 12, Main Rd, Dadar</div>
                      <div><strong>Contact:</strong> +91 022 88888888</div>
                      <div><strong>Email:</strong> dadar@idealclasses.com</div>
                    </div>
                  </div>
                </div>

                {/* add additional static branches as needed */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    
       <Footer />
    </>
  );
};

export default branch;
