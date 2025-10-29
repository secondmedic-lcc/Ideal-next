"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";

const whyChooseReasons = [
  {
    iconSrc: "/img/why-choose-icon-1.png",
    title: "Concept-Based Learning",
  },
  {
    iconSrc: "/img/why-choose-icon-2.png",
    title: "Regular Tests & Doubt-Solving",
  },
  {
    iconSrc: "/img/why-choose-icon-3.png",
    title: "Continuous Support & Guidance",
  },
  {
    iconSrc: "/img/why-choose-icon-4.png",
    title: "Parent-Teacher Interactions",
  },
  {
    iconSrc: "/img/why-choose-icon-5.png",
    title: "Timely Syllabus Completion",
  },
  {
    iconSrc: "/img/why-choose-icon-6.png",
    title: "Student-Centric Approach",
  },
];

const HomeWhyChoose = ({ reasons = whyChooseReasons }) => {
  return (
    <>
      <section className="home-why-choose-section section-padding">
        <Container>
          <Row className="g-5 align-items-center">
            <Col xs={12}>
              <h2 className="web-heading">
                WHY CHOOSE IDEAL CLASSES FOR <br />
                <span className="theme-clr">YOUR ACADEMIC SUCCESS:</span>
              </h2>
            </Col>

            {reasons.map((reason) => (
              <Col xs={4} key={reason.title.replace(/\s/g, "-").toLowerCase()}>
                <div className="why-choose-box">
                  <div className="icon-div">
                    <Image
                      src={reason.iconSrc}
                      alt={`${reason.title} icon`}
                      width={200}
                      height={200}
                    />
                  </div>
                  <h4 className="why-choose-title">{reason.title}</h4>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomeWhyChoose;
