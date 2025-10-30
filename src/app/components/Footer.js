/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Col,
  Container,
  Row,
  Form,
} from "react-bootstrap";
import { FaEnvelope, FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot, FaRegPaperPlane } from "react-icons/fa6";
import { useAdmissionEnquiryForm } from "@/hooks/useAdmissionEnquiryForm";
import Loader from "./Loader";


const Footer = () => {

  const { register, handleSubmit, mutate, isPending } = useAdmissionEnquiryForm();

  return (
    <>
      {isPending && <Loader />}
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
                  <Link href="/social-commitment">Social Commitment</Link>
                </li>
                <li>
                  <Link href="/journey">Journey of Ideal Classes</Link>
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
                <form onSubmit={handleSubmit(mutate)} metthod="POST">
                  <Form.Group className="form-group">
                    <Form.Label className="m-0">Academic Year:</Form.Label>
                    <select className="react-select form-control"
                      {...register("academic_year")}>
                      <option>-- Select Academic Year --</option>
                      <option value={"2025-2026"} selected>2025-2026</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Child's First Name:</Form.Label>
                    <Form.Control
                      {...register("child_fname")}
                      type="text"
                      placeholder="Write child's first name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Child's Last Name:</Form.Label>
                    <Form.Control
                      {...register("child_lname")}
                      type="text"
                      placeholder="Write child's last name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Your Full Name:</Form.Label>
                    <Form.Control
                      {...register('parent_name')}
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
                          {...register("relation")}
                          className="form-check-input"
                          type="radio"
                          name="relation"
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
                          {...register("relation")}
                          className="form-check-input"
                          type="radio"
                          name="relation"
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
                      {...register("contact")}
                      type="text"
                      placeholder="Write your phone no."
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>What's your Email ID?</Form.Label>
                    <Form.Control
                      {...register("email")}
                      type="text"
                      placeholder="Write your email id"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>For which grade are you applying?</Form.Label>
                    <select className="react-select form-control" {...register("apply_for")}>
                      <option value="">-- Select Grade --</option>
                      <option value="nursery">Nursery</option>
                      <option value="kg">KG</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
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
