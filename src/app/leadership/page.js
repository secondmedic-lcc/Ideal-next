"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

const LeadershipPage = () => {
  return (
    <>
      <Header />
      <section className="leadership-team-page section-padding">
        <Container>
          <Row className="g-5">
            <Col xs={12}>
              <h2 className="web-heading">
                Our Leadership <span className="theme-clr">Team</span>
              </h2>
              <p className="web-para">
                At IDEAL, we are proud to be led by an experienced, passionate,
                and visionary team of professionals who have collectively shaped
                the success and evolution of the institution.
              </p>
            </Col>
            <Col xs={6}>
              <div className="team-box">
                <div className="team-img">
                  <Image src="/img/" alt="img" width={300} height={300} />
                </div>
                <h3 className="team-title">CA Jagdish Walawalkar</h3>
                <h6 className="team-role">Chairman & Managing Director</h6>
                <p className="team-content">
                  Qualifications: B.Com., LL.B., F.C.A., A.C.S., Dip IFRS With
                  over 40 years of experience in education, Prof. Walawalkar is
                  the founding force behind IDEAL EDUCATION. His unwavering
                  commitment to academic excellence continues to guide the
                  institution’s growth and innovation.
                </p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="team-box">
                <div className="team-img">
                  <Image src="/img/" alt="img" width={300} height={300} />
                </div>
                <h3 className="team-title">Mr. Gaurav Walawalkar</h3>
                <h6 className="team-role">
                  Head – Business Development & Franchise Operations
                </h6>
                <p className="team-content">
                  A postgraduate in Management from IIM Mumbai, Gaurav has been
                  with IDEAL since 2010 driving strategic expansion and
                  franchise partnerships across the country.
                </p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="team-box">
                <div className="team-img">
                  <Image src="/img/" alt="img" width={300} height={300} />
                </div>
                <h3 className="team-title">CA Manisha Lopez</h3>
                <h6 className="team-role">Head – Accounts & Finance</h6>
                <p className="team-content">
                  A Chartered Accountant with 28 years at IDEAL, Manisha plays a
                  key role in academic strategy and operations in the Commerce
                  stream. She is a pivotal member of the core leadership team.
                </p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="team-box">
                <div className="team-img">
                  <Image src="/img/" alt="img" width={300} height={300} />
                </div>
                <h3 className="team-title">Mrs. Ratna Nambisan</h3>
                <h6 className="team-role">Head – Operations</h6>
                <p className="team-content">
                  postgraduate with a B.Ed., Ratna has served IDEAL IDEAL since
                  15 years She also oversees the Dixit Road Junior College of
                  Science, supporting academically bright students from
                  economically weaker sections.
                </p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="team-box">
                <div className="team-img">
                  <Image src="/img/" alt="img" width={300} height={300} />
                </div>
                <h3 className="team-title">Mr. John Lopes</h3>
                <h6 className="team-role">Academic Advisor | Senior Faculty</h6>
                <p className="team-content">
                  Mathematics With an M.Sc. in Mathematics and B.Ed., John has
                  been teaching at IDEAL for 25 years, shaping young minds
                  across school, college, and professional levels.
                </p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="team-box">
                <div className="team-img">
                  <Image src="/img/" alt="img" width={300} height={300} />
                </div>
                <h3 className="team-title">Mr. Vivek Sarda</h3>
                <h6 className="team-role">Head – Competitive Examinations</h6>
                <p className="team-content">
                  A postgraduate in Management, Vivek leads IDEAL’s competitive
                  exam segment, successfully building verticals like CAT, CET,
                  CMAT, Banking Exams, and more from the ground up.
                </p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="team-box">
                <div className="team-img">
                  <Image src="/img/" alt="img" width={300} height={300} />
                </div>
                <h3 className="team-title">CA Jayesh Chavan</h3>
                <h6 className="team-role">Chartered Accountant</h6>
                <p className="team-content">
                  A Chartered Accountant with 10+ years in corporate finance,
                  Jayesh drives IDEAL’s strategic growth, including fundraising,
                  mergers, and acquisitions.
                </p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="team-box">
                <div className="team-img">
                  <Image src="/img/" alt="img" width={300} height={300} />
                </div>
                <h3 className="team-title">CA Abhishek Jain</h3>
                <h6 className="team-role">
                  Principal – IDEAL College of Engineering
                </h6>
                <p className="team-content">
                  A Chartered Accountant and Management Postgraduate, Abhishek
                  brings 10+ years of experience in managing schools and
                  colleges. He currently leads the Junior College, ensuring
                  excellence in academics and operations.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default LeadershipPage;
