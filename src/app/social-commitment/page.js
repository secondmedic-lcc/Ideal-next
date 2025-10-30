"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Social = () => {
  return (
    <>
      <Header />

      <div className="heading">
        <h1 class="web-heading mb-0">
          OUR SOCIAL <span className="greenclr">COMMITMENT</span>
        </h1>
      </div>
      <section className="social-section section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <p className="heading-text">
                At IDEAL, we believe that education goes beyond academics. In
                line with our mission to support holistic student development,
                the IDEAL Foundation was established in 2003 as our
                not-for-profit arm. It is dedicated to nurturing young minds,
                especially from underrepresented and underserved communities, by
                promoting educational access and extra-curricular growth.
              </p>
            </Col>
            <Col lg={7}>
              <div className="heading">
                <h1 class="web-heading text-start">
                  Empowering Through Education
                </h1>
              </div>
              <div className="item">
                <h3>• CA-CPT Coaching in Rural Maharashtra</h3>
                <p>
                  Conducted free coaching for CA-CPT aspirants across colleges
                  in Raigad, Ratnagiri, and Sindhudurg districts-encouraging
                  students from rural and underprivileged backgrounds to pursue
                  careers in accountancy and finance.
                </p>
              </div>
              <div className="item">
                <h3>• Workshops for TMC Schools</h3>
                <p>
                  Taking responsibility of education of hundreds of
                  underprivileged kids every year through various channels.
                </p>
              </div>
            </Col>

            <Col lg={5}>
              <div className="social-img">
                <Image
                  src="/img/tree-img-13.png"
                  alt="sliderImg"
                  width={300}
                  height={300}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="social-section section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={5}>
              <div className="social-img">
                <Image
                  src="/img/social-img-2-13.png"
                  alt="sliderImg"
                  width={300}
                  height={300}
                />
              </div>
            </Col>
            <Col lg={7}>
              <div className="heading">
                <h1 class="web-heading text-start">
                  Encouraging Talent & Expression
                </h1>
              </div>
              <div className="item">
                <h3>Annual Talent Competitions</h3>
                <p>
                  IDEAL Foundation regularly hosts singing, dancing, and
                  debating competitions-drawing enthusiastic participation from
                  students across different age groups.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="social-section section-padding">
        <Container>
          <Row className="justify-content-center">
           
            <Col lg={7}>
              <div className="heading">
                <h1 class="web-heading text-start">
                 Career Guidance & Awareness
                </h1>
              </div>
              <div className="item">
                <h3>Seminars on Career Pathways</h3>
                <p>
                  Recognizing the importance of career direction, the Foundation regularly conducts career guidance seminars on topics such as:
                </p>
              </div>
              <ul className="social-list">
                <li>
                 Career Options After Std. X
                </li>
                <li>
                  Careers in the Commerce & Science streams

                </li>
                <li>
                  Guidance for MPSC Aspirants

                </li>
                <li>
                     Guidance for CA & CS Aspirants


                </li>
              </ul>

              <p className="sub-text">
                Through these meaningful initiatives, the IDEAL Foundation continues to bridge the educational divide, spark new aspirations, and empower students to unlock their true potential.
              </p>
            </Col>
             <Col lg={5}>
              <div className="social-img">
                <Image
                  src="/img/social-img-3-13.png"
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

export default Social;
