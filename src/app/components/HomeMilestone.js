"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";

const HomeMilestone = () => {
  return (
    <>
      <section className="home-milestone-section">
        <Container>
          <Row className="g-5 align-items-center">
            <Col xs={12}>
              <h2 className="web-heading">
                COMPREHENSIVE COACHING FOR <br />
                <span className="theme-clr">EVERY ACADEMIC MILESTONE</span>
              </h2>
            </Col>
            <Col xs={6}>
              <Image
                src="/img/home-milestone-img.png"
                alt="image"
                width={800}
                height={400}
                className="home-milestone-img"
              />
            </Col>
            <Col xs={6}>
              <p className="home-milestone-para">
                Ideal Classes stands among the few institutes offering expert
                coaching across all levels of education. From school to
                professional courses, we specialize in:
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomeMilestone;
