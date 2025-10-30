"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const courses = () => {
  return (
    <>
      <Header />

      <div className="heading">
        <h1 class="web-heading mb-0">COMMERCE</h1>
      </div>
      <section className="course-section section-padding">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={12}>
              <h4 className="sub-head">PREMIER COMMERCE COACHING IN MUMBAI</h4>
              <p className="heading-text">
                or far too long, Commerce has been misinterpreted as a
                number-driven subject with limited scope. At Ideal Classes, we
                challenge this notion. Commerce is not just about numbers-it's
                the language of business, the gateway to global opportunities,
                and a foundation for future leaders. With close to 4 decades of
                excellence, Ideal Classes has firmly positioned itself among the
                top commerce classes in Mumbai. We empower students with not
                just textbook knowledge, but with the real-world
              </p>
            </Col>
            <Col lg={6}>
              <div className="item">
                <h3>Our Commerce Program: A Legacy of Excellence</h3>
                <p>
                  With a strong emphasis on academic rigor, conceptual clarity,
                  and holistic development, our program is tailored for aspiring
                  commerce professionals.
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="course-img">
                <Image
                  src="/img/courses-1-13.png"
                  alt="sliderImg"
                  width={300}
                  height={300}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="journey-section  section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">Comprehensive Curriculum</div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      Covers core subjects like Accountancy, Eco nomics,
                      Business Studies, Mathematics, and more
                    </li>
                    <li>
                      Focused on concept-building, application, and exam
                      preparation.
                    </li>
                    <li>
                      {" "}
                      Prepares students not just for school exams, but also for
                      competitive and professional exams.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            {/* Right Box */}
            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">Proven Track Record</div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      {" "}
                      Consistent academic excellence with top ranks in board
                      exams.
                    </li>
                    <li>
                      Thousands of success stories-students who’ve moved on to
                      prestigious careers and institutions.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">Expert Faculty</div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      Highly qualified, experienced, and passionate educators.
                    </li>
                    <li>
                      Subject experts with a deep understanding of the commerce
                      curriculum.
                    </li>
                    <li>
                      Innovative teaching techniques to simplify complex topics.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">
                  Regular Parent-Teacher Meetings
                </div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>Transparent academic tracking through monthly PTMs.</li>
                    <li>
                      Detailed performance reports and improvement discussions.
                    </li>
                    <li>
                      Helps parents stay updated with the child’s progress.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">
                  24x7 Teacher Connectivity
                </div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      Round-the-clock access to faculty for academic support and
                      doubts.
                    </li>
                    <li>Students can connect anytime for quick guidance.</li>
                    <li>Ensures continuous learning without obstacles.</li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">Workshops & Expert Tips</div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      Strategic exam preparation workshops for effective
                      learning.
                    </li>
                    <li>
                      Includes time management hacks, performance tips, and
                      smart learning strategies.
                    </li>
                    <li>Motivational sessions to maintain focus and drive.</li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">Shortcut Techniques</div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      Learn smart methods to solve numerical and theoretical
                      problems quickly.
                    </li>
                    <li>
                      Boost accuracy and speed in exams with practical
                      techniques.
                    </li>
                    <li>
                      Enhances problem-solving efficiency for better
                      performance.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">Real-Life Application</div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      Concepts linked to real-world business situations and case
                      studies.
                    </li>
                    <li>
                      Develops a practical understanding of theories and
                      principles.
                    </li>
                    <li>
                      Bridges classroom learning with real-world application.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">
                  Timely Course Completion & In-Depth Revision
                </div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      Structured schedule ensures timely syllabus completion.
                    </li>
                    <li>
                      Comprehensive revision through worksheets, test series,
                      and chapter reviews.
                    </li>
                    <li>
                      Simulated test environment helps identify strengths and
                      areas to improve.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-header">
                  Last Minute Revision (LMR) Series
                </div>
                <div className="info-card-body">
                  <ul className="info-card-list">
                    <li>
                      Quick and concise revision of the entire syllabus before
                      exams.
                    </li>
                    <li>
                      Perfect for final preparation and confidence boosting.
                    </li>
                    <li>Helps reinforce key concepts and improve retention.</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="text-section mb-3">
        <Container>
          <Row>
            <Col lg={12}>
              <h4 className="sub-head">Enrollment Details</h4>
              <p className="heading-text">
                Become a part of a thriving academic community at Ideal Classes.
                Whether you’re aiming for academic excellence or preparing for a
                career in business, we’re here to guide your journey.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="cta-section section-padding">
        <Container>
          <Row>
            <Col lg={12}>
              <h4 className="sub-head">
                Ideal Classes- Where Commerce Meets Excellence.
              </h4>
              <p className="heading-text">
                Join us and take your first step toward a successful future in
                commerce. <br />
                Enroll now and unlock your potential!
              </p>
            </Col>
          </Row>
        </Container>
      </div>
             <Footer />
    </>
  );
};

export default courses;
