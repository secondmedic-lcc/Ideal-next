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

const SUBJECTS_BY_SECTION = {
  school: [
    "Marathi",
    "Hindi",
    "English",
    "Algebra",
    "Geometry",
    "Science",
    "Social Studies",
    "Sanskrit",
  ],
  commerce: [
    "Accounts",
    "Maths",
    "Economics",
    "SP",
    "OC",
    "English",
    "Hindi",
    "IT",
  ],
  science: ["Physics", "Chemistry", "Mathematics", "Biology"],
};

const CareersPage = () => {
  const { data } = useQuery({
    queryKey: ["job-opening"],
    queryFn: getJobOpenings,
  });



  const { register, handleSubmit, mutate, isPending } = useApplyJobForm();

  const [selectedCategory, setSelectedCategory] = useState("");

  const jobOpeningList = data?.data?.list;
  const [selectedJobId, setSelectedJobId] = useState("");
  const [teachingSection, setTeachingSection] = useState("");
  const [showJobModal, setShowJobModal] = useState(false);

  const filteredJobs = useMemo(() => {
    if (!selectedCategory) return [];
    const catId = selectedCategory === "teaching" ? 1 : 2;

    return (jobOpeningList || []).filter(
      (j) => Number(j.category_id) === Number(catId)
    );
  }, [jobOpeningList, selectedCategory]);

  const selectedJob = useMemo(() => {
    return filteredJobs?.find((j) => String(j.id) === String(selectedJobId));
  }, [filteredJobs, selectedJobId]);


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
                goals with organisation`s progress, Ideal Education is always
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
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setTeachingSection("");
                        register("category").onChange(e);
                        setSelectedJobId("");
                      }}
                    >
                      <option value="">Select Category</option>
                      <option value="teaching">Teaching</option>
                      <option value="non-teaching">Non-Teaching</option>
                    </select>

                  </div>
                  {/* ================= TEACHING ================= */}
                  {selectedCategory === "teaching" && (
                    <>
                      {/* SECTION */}
                      <div className="form-group mb-3">
                        <label>Section</label>
                        <select
                          className="form-select form-control"
                          {...register("section", { required: true })}
                          onChange={(e) => {
                            setTeachingSection(e.target.value);
                            register("section").onChange(e);
                          }}
                        >
                          <option value="">Select Section</option>
                          <option value="school">School</option>
                          <option value="commerce">Commerce</option>
                          <option value="science">Science</option>
                        </select>
                      </div>
                      {/* SUBJECT */}
                      {teachingSection && (
                        <div className="form-group mb-3">
                          <label>Subject</label>
                          <select
                            className="form-select form-control"
                            {...register("subject", { required: true })}
                          >
                            <option value="">Select Subject</option>
                            {SUBJECTS_BY_SECTION[teachingSection].map(
                              (sub) => (
                                <option key={sub} value={sub}>
                                  {sub}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}
                    </>
                  )}

                  {/* ================= NON-TEACHING ================= */}
                  {selectedCategory === "non-teaching" && (
                    <div className="form-group mb-3">
                      <label>
                        Job Title{" "}
                        {selectedJobId && (
                          <button
                            type="button"
                            className="btn text-primary p-0 ms-2"
                            onClick={() => setShowJobModal(true)}
                          >
                            <u>details</u>
                          </button>
                        )}
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
                        {filteredJobs.map((job) => (
                          <option key={job.id} value={job.id}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* <div className="form-group mb-3">
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
                      disabled={!selectedCategory}   // category disabled
                    >
                      <option value="">
                        {selectedCategory ? "Select Job Title" : "Select Category First"}
                      </option>

                      {filteredJobs?.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div> */}

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

                  {/* <div className="form-group mb-3">
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
                  </div> */}

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
      </section >
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
