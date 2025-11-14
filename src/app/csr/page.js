"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaGraduationCap,
  FaHandsHelping,
  FaMicrophoneAlt,
  FaBookOpen,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getPageContents } from "@/services/admin/pageContentServices";

const iconMap = {
  "Ideal Foundation": null,
  "Competitions & Events": <FaMicrophoneAlt className="theme-clr me-2" size={30} />,
  "Educational Seminars": <FaBookOpen className="theme-clr me-2" size={30} />,
  "Outreach & Support": <FaHandsHelping className="theme-clr me-2" size={30} />,
};

const CSRPage = () => {
  const pageName = "csr";

  const { data, isLoading, error } = useQuery({
    queryKey: ["page-content", pageName],
    queryFn: () => getPageContents({ page_name: pageName }),
    enabled: !!pageName,
  });

  const sections = data?.data?.list || [];

  const parseDescription = (text) => {
    if (!text) return [];
    return text
      .replace(/[\r\n]/g, "")
      .split(",")
      .map((item) => item.trim().replace(/"/g, ""))
      .filter((item) => item.length > 0);
  };

  return (
    <>
      <Header />

      {sections.map((section) => {
        const items = parseDescription(section.description);

        // HERO SECTION (ID = 1 / Title = Ideal Foundation)
        if (section.title === "Ideal Foundation") {
          return (
            <section
              key={section.id}
              className="section-padding csr-hero-section"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <Container>
                <Row>
                  <Col xs={12}>
                    <h1 className="web-heading">{section.title}</h1>
                    <div
                      className="web-para"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  </Col>
                </Row>
              </Container>
            </section>
          );
        }

        // OTHER SECTIONS
        return (
          <section
            key={section.id}
            className="section-padding"
            style={
              section.title === "Educational Seminars"
                ? { backgroundColor: "#f0f0f0" }
                : {}
            }
          >
            <Container>
              <Row>
                <Col xs={12}>
                  <h2 className="csr-section-title">
                    {iconMap[section.title]} {section.title}
                  </h2>

                  {section.subtitle && (
                    <p className="web-para csr-section-subtitle">
                      {section.subtitle}
                    </p>
                  )}
                </Col>

                <Col lg={12}>
                  {section.title === "Outreach & Support" ? (
                    items.map((item, index) => (
                      <div key={index} className="csr-activity-card">
                        <FaGraduationCap
                          className="theme-clr csr-activity-icon"
                          size={40}
                        />
                        <p className="web-para csr-activity-text">{item}</p>
                      </div>
                    ))
                  ) : (
                    <ul className="common-check-list p-0 csr-list-style">
                      {items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </Col>
              </Row>
            </Container>
          </section>
        );
      })}

      <Footer />
    </>
  );
};

export default CSRPage;
