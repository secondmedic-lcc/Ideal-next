"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Journey = () => {
  return (
    <>
      <Header />

      <div className="heading">
        <h1 class="web-heading mb-0">
          THE JOURNEY OF <span className="greenclr">IDEAL CLASSES</span>
        </h1>
      </div>
      <section className="journey-section section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <p className="heading-text">
                For over 38 years, IDEAL Classes has been a trusted name in the
                world of education-empowering students across every stage of
                learning. We are one of the few institutions offering
                structured, high-quality coaching across diverse academic
                disciplines and competitive streams.
              </p>
            </Col>
            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">
                  Comprehensive Learning Across Domains
                </div>
                <div className="info-card-body">
                  <p className="info-card-subtitle">
                    We provide expert coaching across multiple verticals:
                  </p>
                  <ul className="info-card-list">
                    <li>School-Level Education</li>
                    <li>Commerce</li>
                    <li>Science</li>
                    <li>Entrance Examinations</li>
                    <li>Professional & Competitive Exams</li>
                  </ul>
                </div>
              </div>
            </Col>

            {/* Right Box */}
            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">
                  Our Approach: Structured. Insightful. Impactful.
                </div>
                <div className="info-card-body">
                  <p className="info-card-subtitle">
                    IDEAL’s success lies in its:
                  </p>
                  <ul className="info-card-list">
                    <li>Systematic and knowledge-driven methodology</li>
                    <li>Result-oriented coaching with measurable outcomes</li>
                    <li>
                      Dedicated focus on conceptual clarity and academic
                      excellence
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="legacy-section section-padding pt-0">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="heading">
                <h1 class="web-heading text-start">
                  Our Legacy of <span className="greenclr">Success</span>
                </h1>
              </div>
              <ul className="legacy-list">
                <li>
                  <span>2,00,000+ students</span> have shaped their academic and
                  professional journeys with IDEA
                </li>
                <li>
                  Thousands of <span>IDEAL toppers</span> have secured
                  distinctions in Board and University examinations.
                </li>
                <li>
                  <span>A robust network</span> spread across Western, Central &
                  Harbour Mumbai.
                </li>
                <li>
                  Expansion across India with <span>skill based coaching,</span>{" "}
                  bringing IDEAL’s expertise to learners nationwide.
                </li>
              </ul>
            </Col>

            <Col lg={6}>
              <div className="legacy-img">
                <Image
                  src="/img/journey-1-13.png"
                  alt="sliderImg"
                  width={300}
                  height={300}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
       <Footer />

      
    </>
  );
};

export default Journey;
