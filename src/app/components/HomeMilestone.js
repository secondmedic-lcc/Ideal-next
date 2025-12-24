"use client";

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import parse from "html-react-parser";

import { getHomeSectionTwo } from "@/services/homeSectionsServices";
import { imageUrl } from "@/services/baseUrl";

const HomeMilestone = () => {
  const [row, setRow] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getHomeSectionTwo();
        const item = res?.data?.row || null;
        setRow(item);
      } catch (e) {
        setRow(null);
      }
    })();
  }, []);

  if (!row) return null;


  if (Number(row.status) === 1) return null;

  return (
    <section className="home-milestone-section section-padding">
      <Container>
        <Row className="g-md-5 g-3 align-items-center">
          <Col xs={12}>
            {/* <h2 className="web-heading">
              {row.title ? parse(String(row.title)) : ""}
            </h2> */}
            <h2 className="web-heading">
                COMPREHENSIVE COACHING FOR <br />
              <span className="theme-clr">EVERY ACADEMIC MILESTONE</span>
            </h2>
          </Col>

          {/* Left Image */}
          <Col xs={12} md={6} className="order-1 order-md-1">
            {row.image ? (
              <img
                src={`${imageUrl}${row.image}`}
                alt={row.title || "Section 2 Image"}
                width={600}
                height={450}
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            ) : null}
          </Col>

          {/* Right Content */}
          <Col xs={12} md={6} className="order-2 order-md-2">
            <div className="home-milestone-para">
              {row.description ? parse(String(row.description)) : ""}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeMilestone;
