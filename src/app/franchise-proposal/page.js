"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
// FaArrowLeftLong is not used on this page, but kept import for completeness if needed elsewhere
// import { FaArrowLeftLong } from "react-icons/fa6";

const FranchiseProposal = () => {
  // Content extracted from the PDF
  const benefits = [
    "Proven Success Formula: Benefit from a model honed over decades. Our approach guarantees growth for franchisees and students alike.",
    "Comprehensive Support System: Setup Guidance: From infrastructure to faculty hiring, we've got your back. Teacher Training: Equip your team with our expert-curated program. Marketing Support: National level campaigns tailored to local strategies for guaranteed visibility.",
    "High ROI Potential: With a low investment requirement and strong brand pull, your franchise is set to deliver solid returns.",
  ];

  const idealPartners = [
    "An entrepreneur with a dream to shape young minds.",
    "An educator ready to expand your reach and impact.",
    "A business owner looking for a high-potential sector to invest in.",
  ];

  const successPath = [
    {
      step: "Connect with Us",
      description: "Fill out the form below to express your interest.",
    },
    {
      step: "Explore the Opportunity",
      description: "Meet our team and learn how we'll help you succeed.",
    },
    {
      step: "Sign and Start",
      description:
        "From location setup to marketing, we'll support you at every stage.",
    },
  ];

  const faqs = [
    {
      question:
        "1. What are the requirements to start an Ideal Classes franchise?",
      answer:
        "To start an Ideal Classes franchise you'll need a suitable location, an investment capacity as per the model and a passion for delivering quality education. We'll guide you through infrastructure setup, faculty recruitment, and training processes.",
    },
    {
      question: "2. How much investment is required to open a franchise?",
      answer:
        "The investment varies based on the city and the size of the center. Contact our team for detailed information tailored to locations like Navi Mumbai and Mumbai.",
    },
    {
      question: "3. What is the expected ROI from the franchise?",
      answer:
        "Ideal Classes has a proven business model that ensures a high return on investment. ROI timelines depend on factors like centre size, student intake, and local demand, but many of our franchisees see profitable results within the first year.",
    },
    {
      question:
        "4. Can I operate an Ideal Classes franchise if I don't have prior experience in education?",
      answer:
        "Yes. While experience in the education sector is advantageous, it's not mandatory. Our training programs and operational support ensure you're equipped to manage and grow your franchise effectively.",
    },
    {
      question:
        "6. Why should I choose Ideal Classes over other coaching franchises?",
      answer:
        "Ideal Classes stands apart with its legacy of 38+ years, 51+ success stories, and a well-rounded support system. We blend proven methods with innovative approaches, ensuring your franchise thrives in any location.",
    },
  ];

  return (
    <>
      <Header />
      <section className="section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} className="text-center">
              <h2 className="web-heading">
                What Makes Ideal Classes the Perfect Franchise Model?
              </h2>
              <p className="web-para section-intro-para">
                We're not just a coaching institute: we're a movement in
                education. As a franchisee, you'll benefit with:
              </p>
            </Col>
          </Row>
          <Row className="mt-5 g-4">
            {benefits.map((benefit, index) => (
              <Col lg={4} key={index}>
                <div className="benefit-card">
                  <div className="d-flex align-items-start mb-3">
                    <FaCheckCircle
                      className="theme-clr benefit-icon"
                      size={28}
                    />
                    <h4 className="benefit-title">{benefit.split(":")[0]}</h4>
                  </div>
                  <p className="web-para benefit-description">
                    {benefit.split(":")[1]}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="section-padding who-can-join-section">
        <Container>
          <Row className="align-items-center g-md-5">
            <Col lg={6}>
              <h2 className="web-heading left-align-heading">
                Who Can Join the Ideal Family?
              </h2>
              <p className="web-para left-align-para mb-4">
                We're looking for visionaries who share our passion for
                education. You could be:
              </p>
              <ul className="common-check-list who-can-join-list">
                {idealPartners.map((partner, index) => (
                  <li key={index}>{partner}</li>
                ))}
              </ul>
              <p className="web-para left-align-para mt-4">
                If you believe in the power of education, we believe in you.
              </p>
            </Col>
            <Col lg={6} className="d-flex justify-content-center">
              <Image
                src="/img/ideal-family.jpg"
                alt="Ideal Classes Partner Family"
                width={500}
                height={400}
                className="join-image"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <h2 className="web-heading">Your Path to Franchise Success</h2>
          <Row className="mt-5 justify-content-center">
            {successPath.map((item, index) => (
              <Col md={4} key={index} className="text-center mb-4">
                <div className="success-step-card">
                  <div className="step-number">{index + 1}</div>
                  <h3 className="success-step-title mt-4">{item.step}</h3>
                  <p className="success-step-description">{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5" id="contact-form">
            <Link href="#" className="web-btn franchise-hero-btn">
              START Your Journey <FaArrowRight />
            </Link>
          </div>
        </Container>
      </section>
      <section className="section-padding faq-section">
        <Container>
          <h2 className="web-heading">FAQS</h2>
          <Row className="mt-4 justify-content-center">
            <Col lg={10}>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h4 className="faq-question">{faq.question}</h4>
                  <p className="web-para faq-answer">{faq.answer}</p>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default FranchiseProposal;
