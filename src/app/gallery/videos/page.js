"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const VideoGallery = () => {
  return (
    <>
      <Header />
      <section className="gallery-page section-padding">
        <Container>
          <Row className="g-4">
            <Col xs={12}>
              <h2 className="web-heading">Video Gallery</h2>
            </Col>
            <Col lg={4} md={6}>
              <iframe
                src="https://www.youtube.com/embed/vTXjVuNDdb4?si=-2ETdXAbqqhsgzIg"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </Col>
            <Col lg={4} md={6}>
              <iframe
                src="https://www.youtube.com/embed/BjDIduHFb0A?si=K1gvrI1Z3JtuZC1Z"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </Col>
            <Col lg={4} md={6}>
              <iframe
                src="https://www.youtube.com/embed/vilUdPxLcO4?si=hLIm2fT9ZlZDhi9N"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default VideoGallery;
