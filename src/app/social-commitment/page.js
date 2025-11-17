/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getPageContents } from "@/services/admin/pageContentServices";
import { imageUrl } from "@/services/baseUrl";

const Social = () => {
  const pageName = "social-commitment";

  const { data, isLoading, error } = useQuery({
    queryKey: ["page-content", pageName],
    queryFn: () => getPageContents({ page_name: pageName }),
  });

  const sectionList = data?.data?.list || [];

  const imgURL = (img) =>
    img ? `${imageUrl}/${img}` : "";

  return (
    <>
      <Header />

      {/* MAIN TITLE BLOCK */}
      {sectionList.length > 0 && (
        <div className="heading">
          <h1 className="web-heading mb-0">
            {sectionList[0].title}
          </h1>
        </div>
      )}

      {/* TOP SUBTITLE PARAGRAPH */}
      {sectionList[0]?.subtitle && (
        <section className="social-section section-padding">
          <Container>
            <Row className="justify-content-center">
              <Col lg={12}>
                <p className="heading-text">{sectionList[0].subtitle}</p>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      
      { (isLoading) && <div>Loading...</div> }
      { (error) && <div>Error loading page content</div> }

      {/* OTHER SECTIONS */}
      {sectionList.slice(1).map((block, index) => (
        <section className="social-section section-padding" key={block.id}>
          <Container>
            <Row className="justify-content-center">
              {/* Left or Right image alternate */}
              {index % 2 === 0 ? (
                <>
                  <Col lg={7} md={8} className="order-2 order-md-1">
                    <div className="heading">
                      <h1 className="web-heading text-start">{block.title}</h1>
                    </div>

                    {/* HTML content from API */}
                    <div
                      className="item"
                      dangerouslySetInnerHTML={{ __html: block.description }}
                    ></div>
                  </Col>

                  <Col lg={5} md={4} className="order-1 order-md-2">
                    {block.image && (
                      <div className="social-img">
                        <img
                          src={imgURL(block.image)}
                          alt={block.title}
                          width={300}
                          height={300}
                        />
                      </div>
                    )}
                  </Col>
                </>
              ) : (
                <>
                  <Col lg={5} md={4} className="order-1">
                    {block.image && (
                      <div className="social-img">
                        <img
                          src={imgURL(block.image)}
                          alt={block.title}
                          width={300}
                          height={300}
                        />
                      </div>
                    )}
                  </Col>

                  <Col lg={7} md={8} className="order-2">
                    <div className="heading">
                      <h1 className="web-heading text-start">{block.title}</h1>
                    </div>

                    <div
                      className="item"
                      dangerouslySetInnerHTML={{ __html: block.description }}
                    ></div>
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </section>
      ))}

      <Footer />
    </>
  );
};

export default Social;
