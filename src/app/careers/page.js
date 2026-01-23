"use client";

import React from "react";
import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { getJobOpenings } from "@/services/admin/jobOpeningService";
import { useQuery } from "@tanstack/react-query";
import { useApplyJobForm } from "@/hooks/useApplyJobForm";
import Loader from "../components/Loader";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CareersPage = () => {
  const { data } = useQuery({
    queryKey: ["job-opening"],
    queryFn: getJobOpenings,
  });



  const { register, handleSubmit, mutate, isPending } = useApplyJobForm();

  const jobOpeningList = data?.data?.list;

  const [selectedJobId, setSelectedJobId] = useState("");
  const selectedJob = useMemo(() => {
    return jobOpeningList?.find((j) => String(j.id) === String(selectedJobId));
  }, [jobOpeningList, selectedJobId]);
  const [showJobModal, setShowJobModal] = useState(false);


  return (
    <>
      {isPending && <Loader />}
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
            <Col lg={6} md={6} sm={12}>
              <Image
                src="/img/career-form-img.jpg"
                alt="career-img"
                width={800}
                height={800}
                className="career-form-img d-none d-md-block"
              />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="career-form-card">
                <h4 className="career-heading">Apply for a Job</h4>

                <form onSubmit={handleSubmit(mutate)}>
                  <div className="form-group mb-3">
                    <label>Category</label>
                    <select
                      className="form-select form-control"
                      {...register("category", { required: true })}
                    >
                      <option value="">Select Category</option>
                      <option value="teaching">Teaching</option>
                      <option value="non-teaching">Non-Teaching</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Job Title{" "}
                      {selectedJobId ? (
                        <button
                          type="button"
                          className="btn text-primary p-0 ms-2"
                          onClick={() => setShowJobModal(true)}
                          title="View Job Description"
                        >
                          <u>details</u>
                        </button>
                      ) : null}
                    </label>
                    <select
                      className="form-select form-control"
                      {...register("job_id", { required: true })}
                      onChange={(e) => {
                        setSelectedJobId(e.target.value);
                        register("job_id").onChange(e);
                      }}
                    >
                      <option value="">Select Job Title</option>
                      {jobOpeningList?.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      {...register("contact", { required: true })}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Preferred Branch</label>
                    <select
                      className="form-select form-control"
                      {...register("preferred_branch", { required: true })}
                    >
                      <option value="">Select Branch</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>Upload Resume</label>
                    <input
                      type="file"
                      className="form-control"
                      {...register("resume", { required: true })}
                    />
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
      <Modal
        show={showJobModal}
        onHide={() => setShowJobModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.title || "Job Details"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedJob ? (
            <p className="mb-0">{selectedJob.description}</p>
          ) : (
            <p className="mb-0 text-muted">Please select a job title first.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJobModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CareersPage;
