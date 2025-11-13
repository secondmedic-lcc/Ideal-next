"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa"; // For WhatsApp button
import { IoMailOpenOutline } from "react-icons/io5"; // For Email button

const OnlineLearning = () => {
  // Content extracted from the image
  const features = [
    "Live Lectures with Expert Faculty.",
    "Interactive Virtual Class.",
    "Replay Missed Lectures.",
    "Online Test Series, Evaluation with Results.",
    "MCQ's for every chapter. Repeat if score is less than 80%.",
    "Attend Group Solving / Query Sessions.",
    "Get Support 24x7.",
  ];

  const unnoboProFeatures = [
    "Time table & test series schedule.",
    "View recorded lectures anytime.",
    "Synchronized Attendance.",
    "Real-time notifications.",
    "Results uploaded after every test.",
    "For Student and Parent as well.",
  ];

  return (
    <>
      <Header />

      {/* --- HERO / INTRODUCTION SECTION (Learn@Home) --- */}
      <section className="section-padding online-learning-intro">
        <Container>
          <h2 className="web-heading">Learn@Home</h2>
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <p className="web-para">
                It is the responsibility of the educator to take every measure
                in order to provide seamless and steadfast education to its
                student. We, at Ideal Education, work consistently on developing
                newer ways in order to make learning more convenient and
                accessible. We started **Online Learning**, with an aim to make
                quality education accessible to the entire country as it fits
                the size of the pocket and requires minimal efforts. Students
                can now dedicate their entire time studying rather than
                traveling to and fro which is expensive. Moreover, in situations
                that are outside anyone's control such as flood or any uncertain
                happening, students will never have to compromise or have to
                suffer on their studies. **Learn@Home with Ideal Education and
                become unstoppable.**
              </p>
            </Col>
            <Col lg={5}>
              {/* Image of student learning */}
              <Image
                src="/img/online-learning-hero.jpg"
                alt="Student learning online from home"
                width={600}
                height={400}
                className="online-learning-hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className="web-heading unnobo-app-heading">FEATURES</h2>
            </Col>
            <Col lg={6}>
              <ul className="common-check-list features-list">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Col>
            <Col
              lg={6}
              className="d-flex justify-content-center align-items-center"
            >
              {/* Visual placeholder box - using Image tag from the prompt for consistency */}
              <Image
                src="/img/online-learn-img.jpg"
                alt="Online learning features visual"
                width={400}
                height={400}
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- UNNOBO PRO APP SECTION --- */}
      <section className="section-padding unnobo-app-section">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={5} className="d-flex justify-content-center">
              {/* Image of UNNOBO PRO logo (using a placeholder path) */}
              <Image
                src="/img/unnobo-logo.jpg"
                alt="UNNOBO PRO Logo"
                width={350}
                height={350}
                style={{ width: "100%", height: "auto", maxWidth: "350px" }}
              />
            </Col>
            <Col lg={7}>
              <h2 className="web-heading unnobo-app-heading">UNNOBO PRO</h2>
              <ul className="common-check-list unnobo-app-list">
                {unnoboProFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              {/* Google Play Button */}
              <Link
                href="https://play.google.com/store/apps/details?id=com.unnobopartner.application&hl=en"
                target="_blank"
                className="app-badge-link"
              >
                <Image
                  src="/img/playstore-img.png"
                  alt="Get it on Google Play"
                  width={200}
                  height={60}
                  className="app-badge-image"
                />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- GET IN TOUCH SECTION --- */}
      <section className="section-padding text-center">
        <Container>
          <h3 className="get-in-touch-heading">GET IN TOUCH</h3>
          <div className="contact-button-group">
            <Link
              href="https://wa.me/919820420389?text=I%27m%20interested%20in%20your%20virtual%20coaching%20classes"
              target="_blank"
              className="web-btn whatsapp-btn"
            >
              <FaWhatsapp size={20} /> Connect on WhatsApp
            </Link>
            <Link
              href="mailto:gjw@idealclasses.com?Subject=Unnobo%20Pro%20Enquiry"
              className="web-btn email-btn"
            >
              <IoMailOpenOutline size={20} /> Email Us
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default OnlineLearning;
