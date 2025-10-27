"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomeSlider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
              autoPlaySpeed={2000}
              transitionDuration={500}
              arrows={true}
              dotListClass="custom-dot-list"
            >
              <div>
                <Image
                  src="/img/banner-1.png"
                  alt="sliderImg"
                  width={1920}
                  height={1080}
                />
              </div>
              <div>
                <Image
                  src="/img/banner-2.png"
                  alt="sliderImg"
                  width={1920}
                  height={1080}
                />
              </div>
              <div>
                <Image
                  src="/img/banner-3.png"
                  alt="sliderImg"
                  width={1920}
                  height={1080}
                />
              </div>
              <div>
                <Image
                  src="/img/banner-4.png"
                  alt="sliderImg"
                  width={1920}
                  height={1080}
                />
              </div>
            </Carousel>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default HomeSlider;
