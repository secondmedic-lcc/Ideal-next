"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const CareersPage = () => {
  return (
    <>
      <Header />
      <section className="career-page section-padding">
        <Container>
          <Row className="align-items-center g-md-5">
            <Col xs={12}>
              <h2 className="web-heading mb-0">Careers</h2>
            </Col>
            <Col lg={6}>
              <h3 className="career-heading">Working at Ideal Education</h3>
              <p className="career-para">
                Working at Ideal Education is fulfilling as well as rewarding.
                And, while we dwell on contributing our best to take our
                institution further, we also are keen on developing measures to
                improve consistently. <br /> <br />
                Our work allows encouragement for creative ideas and methods to
                tackle the everyday operations. Along with extra-curricular
                activities over the annual years that never make work seem like
                work. <br /> <br />
                We believe that in doing good work lies the highest
                satisfaction. We are the only coaching classes offering a
                Training Module that gives our staff and faculty the extra edge
                to do well in any given circumstance. Hence, the exemplary work
                satisfaction. With adequate opportunities to align your personal
                goals with organisation's progress, Ideal Education is always
                eager to meet people with newer perspectives that will help us
                offer more better services. <br /> <br />
                If you are compelled, we will be delighted to hear from you.
              </p>
            </Col>
            <Col lg={6}>
              <Image
                src="/img/career-img.jpg"
                alt="career-img"
                width={800}
                height={800}
                className="career-img"
              />
            </Col>
            <Col xs={12}>
              <h2 className="web-heading mb-0">Openings</h2>
            </Col>
            <Col xl={6} lg={6} md={12}>
              <div className="career-card-wrapper">
                {/* <Image
                  alt="career-card-img"
                  width={300}
                  height={300}
                  src="/img/career-icon.png"
                /> */}
                <div className="career-card-content">
                  <h6 className="career-card-label">Job Title</h6>
                  <h4 className="career-card-title">Center Manager</h4>
                  <h6 className="career-card-label">Job Description</h6>
                  <h5 className="career-card-para">
                    As a Center Manager, your direct responsibility is to
                    oversee the daily activities and duties at the center. Along
                    with that, your job entitles you to handle the security,
                    operational and financial matters while overseeing the
                    booking of resources.
                  </h5>
                  <Link href="mailto:" className="web-btn">
                    Apply Now
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CareersPage;
