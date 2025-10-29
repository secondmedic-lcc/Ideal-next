"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";

const HomeFuture = () => {
  return (
    <>
      <section className="home-future-section section-padding">
        <Container>
          <Row className="g-5 align-items-center">
            <Col xs={12}>
              <h2 className="web-heading">
                IDEAL EDUCATION: <br /> SHAPING FUTURES FOR{" "}
                <span className="theme-clr">38 YEARS</span>
              </h2>
            </Col>
            <Col xs={8}>
              <p className="home-future-para">
                More than just a coaching institute, Ideal Education is a
                trusted partner in academic success. From a single classroom 38
                years ago to empowering over 12,500 students annually, we have
                evolved into a leading educational institution across India.
                <br />
                <br />
                With 6 streams, 29 courses, and a team of 200+ expert faculty,
                we provide comprehensive coaching, ensuring every student
                receives the best guidance. Our commitment to quality education
                remains unwavering as we continue to innovate and set new
                benchmarks in learning.
              </p>
            </Col>
            <Col xs={4}>
              <Image
                src="/img/home-future-img.png"
                alt="image"
                width={800}
                height={400}
                className="home-future-img"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomeFuture;
