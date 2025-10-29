"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

const AboutUs = () => {
  return (
    <>
      <Header />

      <div className="heading">
        <h1 class="web-heading clr-green">ABOUT US</h1>
      </div>

      <section className="about-us-section sec-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="about-content">
                <h3 className="sub-h">FOUNDER’S MESSAGE</h3>
                <div className="content">
                  <p>
                    38 years ago, IDEAL began as a humble classroom coaching
                    institute. Today, we proudly educate thousands of students
                    across India. Every year, many learners benefit from our
                    comprehensive approach—whether through classroom coaching,
                    online platforms, or distance education. We have always
                    stood for one core belief: quality education. And that’s
                    exactly what we continue to deliver-across 6 academic
                    streams and many expertly designed courses.
                  </p>
                  <p>
                    Our commitment to excellence is upheld daily by over 200
                    expert educators, who guide students with unmatched
                    dedication and passion. Pioneering progress in education has
                    always been our guiding force. IDEAL was the first coaching
                    institute in India to receive ISO 9001 certification, and
                    the first to initiate an independent teacher training
                    program. We also remain the only coaching institute to offer
                    a dedicated in-hous
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="about-img">
                <Image
                  src="/img/about-us.png"
                  alt="sliderImg"
                  width={300}
                  height={300}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

       <section className="vision-section sec-padding mb-4" style={{
    backgroundImage: "url('/img/about-us-bg-16.png')", }}>
        <Container>
          <Row className="align-items-center g-5">
             <Col lg={6}>
              <div className="vison-img">
                <Image
                  src="/img/about-us-2.png"
                  alt="sliderImg"
                  width={300}
                  height={300}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="vision-content">
                <h3 className="sub-h">VISION</h3>
                <div className="content">
                  <p>
                    To empower learners across India with quality education that fuels ambition and unlocks potential.
                  </p>
                 
                </div>
              </div>
            </Col>
           
          </Row>
        </Container>
      </section>

      <section className="vision-section sec-padding" style={{
    backgroundImage: "url('/img/misson-bg-15.png')", }}>
        <Container>
          <Row className="align-items-center g-5">
             
            <Col lg={6}>
              <div className="vision-content">
                <h3 className="sub-h">MISSION</h3>
                <div className="content">
                  <p>
                    To innovate, inspire & improve everyday, in every way.
                  </p>
                 
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="vison-img">
                <Image
                  src="/img/about-us-3-14.png"
                  alt="sliderImg"
                  width={300}
                  height={300}
                />
              </div>
            </Col>
           
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;
