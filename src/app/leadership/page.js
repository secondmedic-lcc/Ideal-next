"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

const leadershipTeamData = [
  {
    imageSrc: "/img/",
    name: "CA Jagdish Walawalkar",
    role: "Chairman & Managing Director",
    content:
      "Qualifications: B.Com., LL.B., F.C.A., A.C.S., Dip IFRS With over 40 years of experience in education, Prof. Walawalkar is the founding force behind IDEAL EDUCATION. His unwavering commitment to academic excellence continues to guide the institution’s growth and innovation.",
  },
  {
    imageSrc: "/img/",
    name: "Mr. Gaurav Walawalkar",
    role: "Head – Business Development & Franchise Operations",
    content:
      "A postgraduate in Management from IIM Mumbai, Gaurav has been with IDEAL since 2010 driving strategic expansion and franchise partnerships across the country.",
  },
  {
    imageSrc: "/img/",
    name: "CA Manisha Lopez",
    role: "Head – Accounts & Finance",
    content:
      "A Chartered Accountant with 28 years at IDEAL, Manisha plays a key role in academic strategy and operations in the Commerce stream. She is a pivotal member of the core leadership team.",
  },
  {
    imageSrc: "/img/",
    name: "Mrs. Ratna Nambisan",
    role: "Head – Operations",
    content:
      "postgraduate with a B.Ed., Ratna has served IDEAL IDEAL since 15 years She also oversees the Dixit Road Junior College of Science, supporting academically bright students from economically weaker sections.",
  },
  {
    imageSrc: "/img/",
    name: "Mr. John Lopes",
    role: "Academic Advisor | Senior Faculty",
    content:
      "Mathematics With an M.Sc. in Mathematics and B.Ed., John has been teaching at IDEAL for 25 years, shaping young minds across school, college, and professional levels.",
  },
  {
    imageSrc: "/img/",
    name: "Mr. Vivek Sarda",
    role: "Head – Competitive Examinations",
    content:
      "A postgraduate in Management, Vivek leads IDEAL’s competitive exam segment, successfully building verticals like CAT, CET, CMAT, Banking Exams, and more from the ground up.",
  },
  {
    imageSrc: "/img/",
    name: "CA Jayesh Chavan",
    role: "Chartered Accountant",
    content:
      "A Chartered Accountant with 10+ years in corporate finance, Jayesh drives IDEAL’s strategic growth, including fundraising, mergers, and acquisitions.",
  },
  {
    imageSrc: "/img/",
    name: "CA Abhishek Jain",
    role: "Principal – IDEAL College of Engineering",
    content:
      "A Chartered Accountant and Management Postgraduate, Abhishek brings 10+ years of experience in managing schools and colleges. He currently leads the Junior College, ensuring excellence in academics and operations.",
  },
];

const LeadershipPage = ({ teamMembers = leadershipTeamData }) => {
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

            {teamMembers.map((member) => (
              <Col md={6} key={member.name.replace(/\s/g, "-").toLowerCase()}>
                <div className="team-box">
                  <div className="team-img">
                    <Image
                      src={member.imageSrc}
                      alt="img"
                      width={300}
                      height={300}
                    />
                  </div>
                  <h3 className="team-title">{member.name}</h3>
                  <h6 className="team-role">{member.role}</h6>
                  <p className="team-content">{member.content}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default LeadershipPage;
