/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getPageContents } from "@/services/admin/pageContentServices";
import { imageUrl } from "@/services/baseUrl";

const Journey = () => {
  const pageName = "journey";

  const { data, isLoading, error } = useQuery({
    queryKey: ["page-content", pageName],
    queryFn: () => getPageContents({ page_name: pageName }),
  });

  const journey = data?.data?.list || [];

  const imgURL = (img) =>
    img ? `${imageUrl}/${img}` : "";

  const main = journey[0];
  const block1 = journey[1];
  const block2 = journey[2];
  const block3 = journey[3];

  return (
    <>
      <Header />

      {/* PAGE TITLE */}
      <div className="heading">
        <h1 className="web-heading mb-0">
          {main?.title?.replace(" IDEAL CLASSES", "")}
          <span className="greenclr"> IDEAL CLASSES</span>
        </h1>
      </div>
      
      { (isLoading) && <div>Loading...</div> }
      { (error) && <div>Error loading journey page content</div> }

      {/* MAIN SUBTEXT */}
      <section className="journey-section section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <p className="heading-text">{main?.subtitle}</p>
            </Col>

            {/* BLOCK 1 */}
            <Col lg={6} md={6}>
              <div className="info-card">
                <div className="info-card-header">{block1?.title}</div>
                <div className="info-card-body">
                  <p className="info-card-subtitle">{block1?.subtitle}</p>

                  <div
                    className="info-card-list"
                    dangerouslySetInnerHTML={{ __html: block1?.description }}
                  ></div>
                </div>
              </div>
            </Col>

            {/* BLOCK 2 */}
            <Col lg={6} md={6}>
              <div className="info-card">
                <div className="info-card-header">{block2?.title}</div>
                <div className="info-card-body">
                  <p className="info-card-subtitle">{block2?.subtitle}</p>

                  <div
                    className="info-card-list"
                    dangerouslySetInnerHTML={{ __html: block2?.description }}
                  ></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* LEGACY SECTION */}
      <section className="legacy-section section-padding pt-0">
        <Container>
          <Row>
            <Col lg={6} md={8} className="order-2 order-md-1">
              <div className="heading">
                <h1 className="web-heading text-start">{block3?.title}</h1>
              </div>

              <div
                className="legacy-list"
                dangerouslySetInnerHTML={{ __html: block3?.description }}
              ></div>
            </Col>

            <Col lg={6} md={4} className="order-1 order-md-2">
              <div className="legacy-img">
                {block3?.image && (
                  <img
                    src={imgURL(block3.image)}
                    alt={block3.title}
                    width={300}
                    height={300}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Journey;
