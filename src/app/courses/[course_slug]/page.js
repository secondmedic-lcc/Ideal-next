"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "@/services/admin/courseService";
import { useParams } from "next/navigation";
import { imageUrl } from "@/services/baseUrl";

export default function Courses() {
  const params = useParams();
  const course_slug = params?.course_slug;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["course_details", course_slug],
    queryFn: () => getCourseById(course_slug),
    enabled: !!course_slug,
  });


  const course = data?.data || data;

  console.log(`${imageUrl}${course?.course_about_image}`);

  return (
    <>
      <Header />
      <>
        {
          isLoading &&
          <div className="text-center p-5">Loading...</div>
        }
        {isError && <div>Error loading course details</div>}
      </>


      {
        (course != null) && <>
          <div className="heading">
            <h1 className="web-heading mb-0">{course?.course_name}</h1>
          </div>
          <section className="course-section section-padding">
            <Container>
              <Row className="justify-content-center align-items-center">
                <Col lg={12}>
                  <h4 className="sub-head">{course?.course_title}</h4>
                  <p className="heading-text">
                    {course?.course_description}
                  </p>
                </Col>
                <Col lg={6} md={7}>
                  <div className="item">
                    <h3>{course?.course_about_title}</h3>
                    <p>{course?.course_about_desc}</p>
                  </div>
                </Col>
                <Col lg={6} md={5}>
                  <div className="course-img">
                    {
                      course?.course_about_image &&
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`${imageUrl}${course?.course_about_image}`}
                        alt="sliderImg"
                        width={300}
                        height={300}
                      />
                    }
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="journey-section  section-padding">
            <Container>
              <Row className="justify-content-center g-3">

                {
                  course?.CourseSections?.map((section, index) => (
                    <Col lg={6} md={6} xs={6} key={index}>
                      <div className="info-card">
                        <div className="info-card-header">
                          {section?.title || "Comprehensive Curriculum"}
                        </div>
                        <div className="info-card-body">
                          <div
                            className="info-card-list"
                            dangerouslySetInnerHTML={{ __html: section?.description || "" }}
                          ></div>

                        </div>
                      </div>
                    </Col>
                  ))
                }

              </Row>
            </Container>
          </section>
        </>
      }

      <div className="text-section mb-3">
        <Container>
          <Row>
            <Col lg={12}>
              <h4 className="sub-head">Enrollment Details</h4>
              <p className="heading-text">
                Become a part of a thriving academic community at Ideal Classes.
                Whether you’re aiming for academic excellence or preparing for a
                career in business, we’re here to guide your journey.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="cta-section section-padding">
        <Container>
          <Row>
            <Col lg={12}>
              <h4 className="sub-head">
                Ideal Classes- Where Commerce Meets Excellence.
              </h4>
              <p className="heading-text">
                Join us and take your first step toward a successful future in
                commerce. <br />
                Enroll now and unlock your potential!
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};
