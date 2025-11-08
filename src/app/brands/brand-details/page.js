"use client";

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const BrandDetails = () => {
  // --- PLACEHOLDER DATA (This section would be replaced by dynamic data fetching) ---
  const currentBrand = {
    name: "IDEAL IX-X",
    subtitle: "Tutoring Method for Stds. VIII, IX & X",
    description: [
      "We are offering a well-structured tutoring program empowering both the Ideal Tutoring Method for CBSE, ICSE & SSC students of Std. VIII, IX & X.",
      "Teachers ensure excellent teaching, proper evaluation and feedback mechanism.",
      "Student centric environment helps the child achieve the best of his academic performances.",
    ],
    features: [
      "Well-structured tutoring program",
      "Ideal Tutoring Method for CBSE, ICSE & SSC (Std. VIII, IX & X)",
      "Excellent teaching and evaluation",
      "Regular feedback mechanism",
      "Student-centric environment",
    ],
    imageSrc: "/img/brand1.jpg",
    imageAlt: "Students studying under the Ideal IX-X program",
  };
  // --- END PLACEHOLDER DATA ---

  return (
    <>
      <Header />

      {/* --- BRAND DETAILS SECTION --- */}
      <section className="section-padding brand-details-page">
        <Container>
          <Row>
            <Col xs={12} className="text-center mb-5">
              <h1 className="web-heading brand-detail-heading">
                {currentBrand.name}
              </h1>
              <div className="text-center mb-5">
                <Link href="/brands" className="back-btn">
                  <FaArrowLeftLong /> Go Back To Brands List
                </Link>
              </div>
            </Col>
          </Row>

          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h2 className="brand-detail-subtitle">{currentBrand.subtitle}</h2>

              {/* Description Paragraphs */}
              {currentBrand.description.map((p, index) => (
                <p key={index} className="web-para brand-detail-text">
                  {p}
                </p>
              ))}

              {/* Feature List */}
              <h3 className="brand-detail-list-title">Key Program Features:</h3>
              <ul className="common-check-list brand-detail-list">
                {currentBrand.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Col>

            <Col lg={6} className="d-flex justify-content-center">
              {/* Brand Image */}
              <div className="brand-detail-image-wrapper">
                <Image
                  src={currentBrand.imageSrc}
                  alt={currentBrand.imageAlt}
                  width={600}
                  height={450}
                  className="brand-detail-image"
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

export default BrandDetails;
