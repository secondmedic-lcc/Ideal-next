/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getPageContents } from "@/services/admin/pageContentServices";
import { imageUrl } from "@/services/baseUrl";

const OnlineLearning = () => {
  const pageName = "online-learning";

  const { data, isLoading, error } = useQuery({
    queryKey: ["page-content", pageName],
    queryFn: () => getPageContents({ page_name: pageName }),
  });

  const pageContentList = data?.data?.list || [];

  const getBlock = (title) =>
    pageContentList.find((item) => item.title === title);

  const LearnAtHome = getBlock("Learn@Home");
  const Features = getBlock("FEATURES");
  const UnnoboPro = getBlock("UNNOBO PRO");

  return (
    <>
      <Header />

      {/* ---------- SECTION 1: LEARN@HOME ---------- */}
      {LearnAtHome && (
        <section className="section-padding online-learning-intro">
          <Container>
            <h2 className="web-heading">{LearnAtHome.title}</h2>
            <Row className="align-items-center g-5">

              <Col lg={7}>
                <div
                  className="web-para"
                  dangerouslySetInnerHTML={{
                    __html: LearnAtHome.description,
                  }}
                />
              </Col>

              <Col lg={5}>
                <img
                  src={`${imageUrl}${LearnAtHome.image}`}
                  alt="Learn at Home"
                  width={600}
                  height={400}
                  className="online-learning-hero-image"
                />
              </Col>

            </Row>
          </Container>
        </section>
      )}

      {/* ---------- SECTION 2: FEATURES ---------- */}
      {Features && (
        <section className="section-padding">
          <Container>
            <Row>
              <Col xs={12}>
                <h2 className="web-heading">{Features.title}</h2>
              </Col>

              <Col lg={6}>
                <div
                  className="common-check-list features-list"
                  dangerouslySetInnerHTML={{
                    __html: Features.description,
                  }}
                />
              </Col>

              <Col
                lg={6}
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={`${imageUrl}${Features.image}`}
                  alt="Features Image"
                  width={400}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                />
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* ---------- SECTION 3: UNNOBO PRO ---------- */}
      {UnnoboPro && (
        <section className="section-padding unnobo-app-section">
          <Container>
            <Row className="align-items-center g-5">

              <Col lg={5} className="d-flex justify-content-center">
                <img
                  src={`${imageUrl}${UnnoboPro.image}`}
                  alt="Unnobo Pro"
                  width={350}
                  height={350}
                  style={{ width: "100%", height: "auto", maxWidth: "350px" }}
                />
              </Col>

              <Col lg={7}>
                <h2 className="web-heading">{UnnoboPro.title}</h2>

                <div
                  className="common-check-list unnobo-app-list"
                  dangerouslySetInnerHTML={{
                    __html: UnnoboPro.description,
                  }}
                />

                <Link
                  href="https://play.google.com/store/apps/details?id=com.unnobopartner.application&hl=en"
                  target="_blank"
                >
                  <img
                    src="/img/playstore-img.png"
                    alt="Google Play"
                    width={200}
                    height={60}
                    className="app-badge-image"
                  />
                </Link>
              </Col>

            </Row>
          </Container>
        </section>
      )}

      {/* ---------- SECTION 4: GET IN TOUCH ---------- */}
      <section className="section-padding text-center">
        <Container>
          <h3 className="get-in-touch-heading">GET IN TOUCH</h3>

          <div className="contact-button-group">
            <Link
              href="https://wa.me/919820420389?text=I%27m%20interested%20in%20your%20virtual%20coaching%20classes"
              target="_blank"
              className="web-btn whatsapp-btn"
            >
              <FaWhatsapp size={20} /> Connect on WhatsApp
            </Link>

            <Link
              href="mailto:gjw@idealclasses.com?Subject=Unnobo%20Pro%20Enquiry"
              className="web-btn email-btn"
            >
              <IoMailOpenOutline size={20} /> Email Us
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default OnlineLearning;
