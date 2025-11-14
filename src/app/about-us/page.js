/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getPageContents } from "@/services/admin/pageContentServices";
import parse from "html-react-parser";
import { imageUrl } from "@/services/baseUrl";

const AboutUs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["page-content", "about-us"],
    queryFn: () => getPageContents({page_name:"about-us"}),
  });

  const aboutUsData = data?.data?.list || [];

  const founders = aboutUsData[0];
  const vision = aboutUsData[1]; 
  const mission = aboutUsData[2];

  return (
    <>
      <Header />

      <div className="heading">
        <h1 className="web-heading clr-green">ABOUT US</h1>
      </div>
      
      <section className="about-us-section section-padding">
        <Container>
          <Row className="align-items-center">
            { (isLoading) && <p>Loading...</p>}
            { (error)&& <p>Something went wrong</p> }
          </Row>
        </Container>
      </section>

      {/* ------------------ FOUNDER’S MESSAGE ------------------ */}
      <section className="about-us-section section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} md={8} className="order-2 order-md-1">
              <div className="about-content">
                <h3 className="sub-h">{founders?.title}</h3>

                <div className="content">
                  {founders?.description ? parse(founders.description) : ""}
                </div>
              </div>
            </Col>

            <Col lg={5} md={4} className="order-1 order-md-2">
              <div className="about-img">
                <img
                  src={`${imageUrl}${founders?.image}`}
                  alt="Founder's Image"
                  width={300}
                  height={300}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------ VISION ------------------ */}
      <section
        className="vision-section section-padding mb-md-4 mb-3"
        style={{ backgroundImage: "url('/img/about-us-bg-16.png')" }}
      >
        <Container>
          <Row className="align-items-center g-lg-5 g-3">
            <Col lg={6} md={4}>
              <div className="vison-img">
                <img
                  src={`${imageUrl}${vision?.image}`}
                  alt="Vision Image"
                  width={300}
                  height={300}
                />
              </div>
            </Col>

            <Col lg={6} md={8}>
              <div className="vision-content">
                <h3 className="sub-h">{vision?.title}</h3>

                <div className="content">
                  <p>{vision?.subtitle}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------ MISSION ------------------ */}
      <section
        className="vision-section section-padding"
        style={{ backgroundImage: "url('/img/misson-bg-15.png')" }}
      >
        <Container>
          <Row className="align-items-center g-lg-5 g-3">
            <Col lg={6} md={8} className="order-2 order-md-1">
              <div className="vision-content">
                <h3 className="sub-h">{mission?.title}</h3>

                <div className="content">
                  <p>{mission?.subtitle}</p>
                </div>
              </div>
            </Col>

            <Col lg={6} md={4} className="order-1 order-md-2">
              <div className="vison-img">
                <img
                  src={`${imageUrl}${mission?.image}`}
                  alt="Mission Image"
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

export default AboutUs;
