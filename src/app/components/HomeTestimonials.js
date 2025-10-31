"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <ul className="review-stars">
      {[...Array(fullStars)].map((_, i) => (
        <li key={`full-${i}`}>
          <FaStar />
        </li>
      ))}
      {hasHalfStar && (
        <li key="half">
          <FaStarHalfAlt />
        </li>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <li key={`empty-${i}`}>
          <FaRegStar />
        </li>
      ))}
    </ul>
  );
};

const testimonialData = [
  {
    userImage: "/img/review-user-1.png",
    content:
      "Teachers at ideal education are the drive behind our successful results. They have consistently solved our doubts and provided valuable and insightful knowledge that genuinely helped in our studies. They also gave guidance on how to prepare for exams, and methods to methods to prepare a concept.",
    name: "Arpita Tiwari",
    rating: 3.5,
  },
  {
    userImage: "/img/review-user-2.png",
    content:
      "Teachers at ideal education are the drive behind our successful results. They have consistently solved our doubts and provided valuable and insightful knowledge that genuinely helped in our studies. They also gave guidance on how to prepare for exams, and methods to methods to prepare a concept.",
    name: "Arpita Tiwari",
    rating: 3.5,
  },
  {
    userImage: "/img/review-user-1.png",
    content:
      "Teachers at ideal education are the drive behind our successful results. They have consistently solved our doubts and provided valuable and insightful knowledge that genuinely helped in our studies. They also gave guidance on how to prepare for exams, and methods to methods to prepare a concept.",
    name: "Arpita Tiwari",
    rating: 3.5,
  },
  {
    userImage: "/img/review-user-2.png",
    content:
      "Teachers at ideal education are the drive behind our successful results. They have consistently solved our doubts and provided valuable and insightful knowledge that genuinely helped in our studies. They also gave guidance on how to prepare for exams, and methods to methods to prepare a concept.",
    name: "Arpita Tiwari",
    rating: 3.5,
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
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

const HomeTestimonials = ({ testimonials = testimonialData }) => {
  return (
    <>
      <section className="home-testimonials-section web-bg section-padding">
        <Container>
          <Row className="g-md-5 align-items-center">
            <Col xs={12}>
              <h2 className="web-heading">
                Our <span className="theme-clr">testimonial</span>
              </h2>
            </Col>
            <Col xs={4} className=" d-none d-md-block">
              <Image
                src="/img/theme-arrow.png"
                alt="img"
                width={500}
                height={400}
                className="review-arrow"
              />
              <h2 className="review-heading">
                What Our <span className="theme-clr">Students</span> Are Saying
              </h2>
            </Col>
            <Col md={8} xs={12}>
              <Carousel
                swipeable={false}
                draggable={true}
                showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                transitionDuration={500}
                arrows={false}
                dotListClass="custom-dot-list"
              >
                {testimonials.map((review, index) => (
                  <div key={index}>
                    <div className="review-box">
                      <div className="img-div">
                        <Image
                          src={review.userImage}
                          alt="img"
                          width={300}
                          height={300}
                        />
                      </div>
                      <p className="review-content">{review.content}</p>
                      <hr />
                      <div className="review-user">
                        {renderStars(review.rating)}
                        <p className="mb-0">
                          <b className="theme-clr">{review.name}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomeTestimonials;
