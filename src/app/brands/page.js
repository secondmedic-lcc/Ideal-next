"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

// Define a reusable component for a single brand card
const BrandCard = ({ logoSrc, name, description, link }) => (
  <Col lg={4} md={6} className="mb-4">
    <div className="brand-card">
      <div className="brand-logo-wrapper">
        <Image
          src={logoSrc}
          alt={`${name} Logo`}
          width={250}
          height={100}
          className="brand-logo"
        />
      </div>
      <p className="web-para brand-description">{description}</p>
      <Link href={link} className="web-btn brand-read-more-btn">
        Read More
      </Link>
    </div>
  </Col>
);

const BrandsPage = () => {
  // Data structure for all brands extracted from the image
  const brandsData = [
    {
      logoSrc: "/img/brand1.jpg",
      name: "Ideal IX-X",
      description:
        "We are offering a well-structured tutoring program empowering both the Ideal Tutoring Method for CBSE, ICSE & SSC students of Std. VIII, IX & X. Teachers ensure excellent teaching, proper evaluation and feedback mechanism. Student centric environment helps the child achieve the best of his academic performances.",
      link: "/brands/brand-details",
    },
    {
      logoSrc: "/img/brand2.jpg",
      name: "Ideal Commerce",
      description:
        "Ideal Commerce caters to commerce students studying at all levels from Junior College to Post-graduation. Over 5000 T.Y.B.Com students graduate successfully from IDEAL's Commerce Classes every year.",
      link: "/brands/brand-details",
    },
    {
      logoSrc: "/img/brand3.jpg",
      name: "Ideal 21st Century Competitions",
      description:
        "IDEAL 21st CENTURY is a division of Ideal Classes which imparts coaching for XI, XII, JEE, NEET & MHT-CET. The institute has a glorious tradition of successfully sending our students to prestigious Engineering and Medical colleges in and around Mumbai and we are deeply committed to maintaining this tradition.",
      link: "/brands/brand-details",
    },
  ];

  return (
    <>
      <Header />

      {/* --- BRANDS LIST SECTION --- */}
      <section className="section-padding brands-page-section">
        <Container>
          <Row>
            <Col xs={12} className="text-center mb-5">
              <h1 className="web-heading">Our Brands</h1>
            </Col>
          </Row>
          <Row className="g-4">
            {brandsData.map((brand, index) => (
              <BrandCard
                key={index}
                logoSrc={brand.logoSrc}
                name={brand.name}
                description={brand.description}
                link={brand.link}
              />
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default BrandsPage;
