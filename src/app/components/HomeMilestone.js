"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";

const HomeMilestone = () => {
  return (
    <>
      <section className="home-milestone-section web-bg section-padding">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={12}>
              <h2 className="web-heading">
                COMPREHENSIVE COACHING FOR <br />
                <span className="theme-clr">EVERY ACADEMIC MILESTONE</span>
              </h2>
            </Col>
            <Col lg={6}>
              <Image
                src="/img/home-milestone-img.png"
                alt="image"
                width={800}
                height={400}
                className="home-milestone-img"
              />
            </Col>
            <Col lg={6}>
              <p className="home-milestone-para">
                Ideal Classes stands among the few institutes offering expert
                coaching across all levels of education. From school to
                professional courses, we specialize in:
              </p>
              <ul className="common-check-list">
                <li>School | Commerce | Science</li>
                <li>Competitive & Professional Exams</li>
                <li>BAF, BMS, BBI, BFM | Engineering</li>
              </ul>
              <p className="home-milestone-para mb-0">
                With a structured, result-oriented approach, we have empowered
                over <b className="theme-clr">2,00,000 students</b> to excel in
                their careers, producing thousands of Board and University
                toppers.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomeMilestone;
