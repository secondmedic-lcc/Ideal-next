"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const galleryCategories = [
  {
    imageSrc: "/img/photo-cat-1.jpg",
    title: "Students Farewell",
    href: "/gallery/photos/photo-detail",
  },
  {
    imageSrc: "/img/photo-cat-2.jpg",
    title: "Students Picnic",
    href: "/gallery/photos/photo-detail",
  },
  {
    imageSrc: "/img/photo-cat-3.jpg",
    title: "Staff Get to Gather",
    href: "/gallery/photos/photo-detail",
  },
  {
    imageSrc: "/img/photo-cat-4.jpg",
    title: "Staff Picnic",
    href: "/gallery/photos/photo-detail",
  },
];

const PhotoGallery = ({ categories = galleryCategories }) => {
  return (
    <>
      <Header />
      <section className="gallery-page section-padding">
        <Container>
          <Row className="g-4">
            <Col xs={12}>
              <h2 className="web-heading">Photo Gallery</h2>
            </Col>
            {categories.map((category) => (
              <Col
                lg={3}
                md={6}
                key={category.title.replace(/\s/g, "-").toLowerCase()}
              >
                <Link href={category.href} className="photo-wrapper">
                  <Image
                    src={category.imageSrc}
                    width={600}
                    height={500}
                    alt={category.title}
                  />
                  <div className="photo-content">
                    <h4>{category.title}</h4>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default PhotoGallery;
