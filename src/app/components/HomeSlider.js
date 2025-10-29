"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const sliderImages = [
  {
    src: "/img/banner-1.png",
    alt: "Banner Image 1",
  },
  {
    src: "/img/banner-2.png",
    alt: "Banner Image 2",
  },
  {
    src: "/img/banner-3.png",
    alt: "Banner Image 3",
  },
  {
    src: "/img/banner-4.png",
    alt: "Banner Image 4",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const HomeSlider = ({ images = sliderImages }) => {
  return (
    <>
      <section className="home-banner-slider">
        <Row className="g-0">
          <Col>
            <Carousel
              swipeable={false}
              draggable={true}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              transitionDuration={500}
              arrows={true}
              dotListClass="custom-dot-list"
            >
              {images.map((image, index) => (
                <div key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1920}
                    height={1080}
                  />
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default HomeSlider;
