"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Col,
  Container,
  Row,
  Offcanvas,
  Dropdown,
  Form,
} from "react-bootstrap";
import { FaEnvelope, FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot, FaRegPaperPlane } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="section-padding">
        <Container>
          <Row className="g-3">
            <Col xs={3}>
              <Link href="/" className="footer-logo">
                <Image
                  src="/img/logo.png"
                  alt="logo"
                  width={300}
                  height={150}
                />
              </Link>
              <ul className="footer-info">
                <li>
                  <Link href="tel:+917666657988">
                    <FaPhoneSquareAlt />
                    +91 76666 57988
                  </Link>
                </li>
                <li>
                  <Link href="mailto:admission@idealclasses.com">
                    <FaEnvelope />
                    admission@idealclasses.com
                  </Link>
                </li>
                <li>
                  <Link href="#!">
                    <FaLocationDot />
                    Branches: Virar, Nallasopara, Borivali, Goregaon, Vile
                    Parle, Nerul.
                  </Link>
                </li>
              </ul>
              <ul className="footer-social">
                <li>Follow us</li>
                <li>
                  <Link href="">
                    <Image
                      src="/img/facebook-icon.png"
                      alt="icon"
                      width={50}
                      height={50}
                    />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <Image
                      src="/img/insta-icon.png"
                      alt="icon"
                      width={50}
                      height={50}
                    />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <Image
                      src="/img/linkedin-icon.png"
                      alt="icon"
                      width={50}
                      height={50}
                    />
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={2}>
              <h5 className="footer-heading">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <Link href="#">Flexi Class</Link>
                </li>
                <li>
                  <Link href="#">Member's Login</Link>
                </li>
                <li>
                  <Link href="#">News & Events</Link>
                </li>
                <li>
                  <Link href="#">I-SET</Link>
                </li>
              </ul>
            </Col>
            <Col xs={2}>
              <h5 className="footer-heading">Franchisee Invited</h5>
              <ul className="footer-links">
                <li>
                  <Link href="#">Intrested in Franchisee?? </Link>
                </li>
                <li>
                  <Link href="#">Click Here!</Link>
                </li>
              </ul>
            </Col>
            <Col xs={2}>
              <h5 className="footer-heading">Find Us</h5>
              <ul className="footer-links">
                <li>
                  <Link href="#">Branch Locator</Link>
                </li>
                <li>
                  <Link href="#">Course Locator</Link>
                </li>
              </ul>
            </Col>
            <Col xs={3}>
              <h5 className="footer-heading">Help us know you better</h5>
              <div className="form-box">
                <form>
                  <Form.Group className="form-group">
                    <Form.Label className="m-0">Academic Year:</Form.Label>
                    <select className="react-select form-control">
                      <option>-- Select Academic Year --</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Child's First Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Write child's first name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Child's Last Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Write child's last name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Your Full Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Write your full name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Your relationship with the child:</Form.Label>
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="form-check me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="parent"
                          id="flexRadioDefault1"
                          value="Father"
                        />
                        <label
                          className="form-check-label m-0"
                          htmlFor="flexRadioDefault1"
                        >
                          Father
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="parent"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label m-0"
                          htmlFor="flexRadioDefault2"
                        >
                          Mother
                        </label>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>What's your phone number?</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Write your phone no."
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>What's your Email ID?</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Write your email id"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>For which grade are you applying?</Form.Label>
                    <select className="react-select form-control">
                      <option>-- Select Grade --</option>
                    </select>
                  </Form.Group>
                  <button type="submit" className="web-btn">
                    <FaRegPaperPlane /> Enquire
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
