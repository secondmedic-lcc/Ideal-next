"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { getJobOpenings } from "@/services/admin/jobOpeningService";
import { useQuery } from "@tanstack/react-query";

const CareersPage = () => {
  const { data } = useQuery({
    queryKey: ["job-opening"],
    queryFn: getJobOpenings,
  });

  const jobOpeningList = data?.data?.list;

  return (
    <>
      <Header />
      <section className="career-page section-padding">
        <Container>
          <Row className="align-items-center g-md-5 mb-5"> 
            <Col xs={12}>
              <h2 className="web-heading mb-0">Careers</h2>
            </Col>
            <Col lg={6}>
              <h3 className="career-heading">Working at Ideal Education</h3>
              <p className="career-para">
                Working at Ideal Education is fulfilling as well as rewarding.
                And, while we dwell on contributing our best to take our
                institution further, we also are keen on developing measures to
                improve consistently. <br /> <br />
                Our work allows encouragement for creative ideas and methods to
                tackle the everyday operations. Along with extra-curricular
                activities over the annual years that never make work seem like
                work. <br /> <br />
                We believe that in doing good work lies the highest
                satisfaction. We are the only coaching classes offering a
                Training Module that gives our staff and faculty the extra edge
                to do well in any given circumstance. Hence, the exemplary work
                satisfaction. With adequate opportunities to align your personal
                goals with organisation's progress, Ideal Education is always
                eager to meet people with newer perspectives that will help us
                offer more better services. <br /> <br />
                If you are compelled, we will be delighted to hear from you.
              </p>
            </Col>
            <Col lg={6}>
              <Image
                src="/img/career-img.jpg"
                alt="career-img"
                width={800}
                height={800}
                className="career-img"
              />
            </Col>
            {/* <Col xs={12}>
              <h2 className="web-heading mb-0">Openings</h2>
            </Col> */}
            {/* {
              jobOpeningList &&
              jobOpeningList.map((data, index) => (
                <Col xl={6} lg={6} md={12} key={index}>
                  <div className="career-card-wrapper">
                    <Image
                  alt="career-card-img"
                  width={300}
                  height={300}
                  src="/img/career-icon.png"
                />
                    <div className="career-card-content">
                      <h6 className="career-card-label">Job Title</h6>
                      <h4 className="career-card-title">{data.title}</h4>
                      <h6 className="career-card-label">Job Description</h6>
                      <h5 className="career-card-para">{data.description}</h5>
                      <Link href={`mailto:${data.apply_mail}`} className="web-btn">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </Col>
              ))
            } */}
           
          </Row>
          <Row className="align-items-center career-form-section g-md-5">
             <Col lg={6}  md={6} sm={12}>
              <Image
                src="/img/career-form-img.jpg"
                alt="career-img"
                width={800}
                height={800}
                className="career-form-img d-none d-md-block"
              />
            </Col>
            <Col  lg={6} md={6} sm={12}>
              <div className="career-form-card">
                <h4 className="career-heading">Apply for a Job</h4>

                <form>
                  <div className="form-group mb-3">
                    <label>Category</label>
                    <select className="form-select form-control">
                      <option value="">Select Category</option>
                      <option value="teaching">Teaching</option>
                      <option value="non-teaching">Non-Teaching</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Job Title
                      <button
                        type="button"
                        className="info-btn"
                        title="View Job Description"
                      >
                        i
                      </button>
                    </label>
                    <select className="form-select form-control">
                      <option value="">Select Job Title</option>
                      <option>Account Manager</option>
                      <option>Center Manager</option>
                      <option>Teacher</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Preferred Branch</label>
                    <select className="form-select form-control">
                      <option value="">Select Branch</option>
                      <option>Delhi</option>
                      <option>Mumbai</option>
                      <option>Bangalore</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Upload Resume</label>
                    <input type="file" className="form-control" />
                  </div>

                  <button type="submit" className="web-btn">
                    Submit Application
                  </button>
                </form>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CareersPage;
