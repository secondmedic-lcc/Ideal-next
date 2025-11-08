"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link"; // Included in case "Read More" links are added later
import {
  FaGraduationCap,
  FaHandsHelping,
  FaMicrophoneAlt,
  FaBookOpen,
} from "react-icons/fa";

const CSRPage = () => {
  // Content extracted and structured from the image
  const competitions = [
    "Vocal Music (Marathi Sugam Sangeet)",
    "Instrumental Music (Tabla Playing)",
    "Mono-Acting",
    "Elocution Competition",
  ];

  const seminars = [
    "What after 10th?",
    "New syllabus - Change and challenges",
    "Workshop for Maharashtra Public service Commission exam",
    "Commerce careers like CA, CS",
    "Career in Science like Medicine, Engineering",
  ];

  const otherActivities = [
    "IDEAL Foundation carried out training of students from Thane Municipal Corporation Schools. More than hundred students were trained by IDEAL Foundation staff. The training was done for Extra-Curricular Activities.",
    "In 2007-08 IDEAL Foundation conducted coaching for CA-CPT exam in different colleges in Raigarh, Ratnagiri and Sindhudurg districts of Maharashtra. The coaching was done by professors of IDEAL Classes in order to encourage the students of backward area in pursuing professional courses.",
  ];

  return (
    <>
      <Header />

      {/* --- HERO / INTRODUCTION SECTION --- */}
      <section
        className="section-padding csr-hero-section"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <h1 className="web-heading">Ideal Foundation</h1>
              <p className="web-para">
                IDEAL Foundation established in the year 2003. It is a
                <b> charitable institute registered under Public Trust Act</b>{" "}
                and also having a registration no. under section 80G of Income
                Tax Act. The Objective of the Foundation is to promote
                <b> Non-Academic Interest of the Students</b>. Since IDEAL
                Classes is concentrating only on Academics, it was decided to
                promote students' interest in singing, dancing, debating.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- COMPETITIONS SECTION --- */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className="csr-section-title">
                <FaMicrophoneAlt className="theme-clr me-2" size={30} />{" "}
                Competitions & Events
              </h2>
              <p className="web-para csr-section-subtitle">
                For the last four years, IDEAL foundation arranges various
                competitions. It consists of:
              </p>
            </Col>
            <Col lg={12}>
              <ul className="common-check-list p-0 csr-list-style">
                {competitions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- SEMINARS SECTION --- */}
      <section
        className="section-padding csr-seminar-section"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className="csr-section-title">
                <FaBookOpen className="theme-clr me-2" size={30} /> Educational
                Seminars
              </h2>
              <p className="web-para csr-section-subtitle">
                IDEAL Foundation also conducts various seminars to make the
                students and parents aware on various issues. The seminar
                conducted on various subjects like:
              </p>
            </Col>
            <Col lg={12}>
              <ul className="common-check-list p-0 csr-list-style">
                {seminars.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- OTHER ACTIVITIES SECTION --- */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col xs={12} className="mb-4">
              <h2 className="csr-section-title">
                <FaHandsHelping className="theme-clr me-2" size={30} /> Outreach
                & Support
              </h2>
            </Col>
            <Col lg={12} className="mx-auto">
              {otherActivities.map((activity, index) => (
                <div key={index} className="csr-activity-card">
                  <FaGraduationCap
                    className="theme-clr csr-activity-icon"
                    size={40}
                  />
                  <p className="web-para csr-activity-text">{activity}</p>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default CSRPage;
