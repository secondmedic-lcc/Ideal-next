"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import parse from "html-react-parser";

import { getHomeSectionOne } from "@/services/homeSectionsServices";
import { imageUrl } from "@/services/baseUrl";

const HomeFuture = () => {
  const [row, setRow] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getHomeSectionOne();
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
    <section className="home-future-section section-padding">
      <Container>
        <Row className="g-md-5 g-3 align-items-center">
          <Col xs={12}>
            {/* <h2 className="web-heading">
              {row.title ? parse(String(row.title)) : ""}
            </h2> */}
            <h2 className="web-heading">
              IDEAL EDUCATION: <br /> SHAPING FUTURES FOR{" "}
              <span className="theme-clr">38 YEARS</span>
            </h2>
          </Col>

          <Col xs={12} md={8} className="order-2 order-md-1">
            <p className="home-future-para">
              {row.description ? parse(String(row.description)) : ""}
            </p>
          </Col>

          <Col xs={12} md={4} className="order-1 order-md-2">
            {row.image ? (
              <img
                  src={`${imageUrl}${row.image}`}
                  alt="Features Image"
                  width={400}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                />
            ) : null}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeFuture;
