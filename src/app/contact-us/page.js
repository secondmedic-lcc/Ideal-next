"use client";
import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContactRequest } from "@/hooks/useContactRequest";

export default function contactus() {

  const { handleSubmit, register, reset, isPending, mutate } = useContactRequest();

  return (
    <>
      <Header />
      <section className="heading-section section-padding">
        <Container>
          <Row>
            <Col xl={12}>
              <h2 className="web-heading">Contact Us</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="contact-top section-padding pt-0">
        <Container>
          <Row className="g-3">
            <Col xl={4} lg={6} md={6}>
              <div className="contact-top-box">
                <div className="icon-div">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h5>Location</h5>
                  <p>
                    Ideal Management Goregaon<br />
                    Shop No. 24, 7, 8, 9, Ground Floor, Kenorita Jewels Building Station Road, Bandu Gore Marg, Goregaon, Mumbai, Maharashtra 400104, India
                  </p>
                </div>
              </div>
            </Col>
            <Col xl={4} lg={6} md={6}>
              <div className="contact-top-box">
                <div className="icon-div">
                  <FaPhone />
                </div>
                <div>
                  <h5>Phone</h5>
                  <p>+91-76666 57988</p>
                </div>
              </div>
            </Col>
            <Col
              xl={{ span: 4, offset: 0 }}
              lg={{ span: 6, offset: 3 }}
              md={{ span: 6, offset: 3 }}
            >
              <div className="contact-top-box">
                <div className="icon-div">
                  <FaEnvelope />
                </div>
                <div>
                  <h5>Email</h5>
                  <p>info@idealclasses.com</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="contact-main section-padding pt-0">
        <Container>
          <Row className="g-3">
            <Col xl={6} lg={7} md={12}>
              <div className="contact-box">
                <h2 className="web-heading clr-theme2 mb-1">Get In Touch</h2>
                <p>
                  Reach out to us anytime! We're here to assist with your
                  queries, support needs, and feedback. Contact us today!
                </p>
                <form onSubmit={handleSubmit(mutate)} method="POST">
                  <Row>
                    <Col xl={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Your Full Name"
                      >
                        <Form.Control type="text" placeholder="" name="name" {...register('name')} />
                      </FloatingLabel>
                    </Col>
                    <Col xl={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Your Email"
                      >
                        <Form.Control
                          type="email"
                          placeholder=""
                          name="email"
                          {...register('email')}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Your Phone Number"
                      >
                        <Form.Control
                          type="text"
                          placeholder=""
                          name="contact"
                          {...register('contact')}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl={6}>
                      <FloatingLabel controlId="floatingInput" label="Subject">
                        <Form.Control
                          type="text"
                          placeholder=""
                          name="subject"
                          {...register('subject')}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl={12}>
                      <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Write Your Message Here..."
                      >
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here"
                          name="message"
                          style={{ height: "100px" }}
                          {...register('message')}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <button type="submit" className="web-btn">
                    Submit
                  </button>
                </form>
              </div>
            </Col>
            <Col xl={6} lg={5} md={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d35763.23345210617!2d72.845608!3d19.165339!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6518092da25%3A0x7d48076e77632e8f!2sIdeal%20Management%20Goregaon%20-%20Best%20coaching%20in%20Mumbai%20for%20MBA%20and%20Banking%20exams!5e1!3m2!1sen!2sus!4v1762410413640!5m2!1sen!2sus"
                width="100%"
                height="568"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}
