"use client";

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getGalleryVideos } from "@/services/admin/galleryVideoService";

const VideoGallery = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery-video"],
    queryFn: getGalleryVideos,
  });

  const videoList = data?.data?.list;

  return (
    <>
      <Header />
      <section className="gallery-page section-padding">
        <Container>
          <Row className="g-4">
            <Col xs={12}>
              <h2 className="web-heading">Video Gallery</h2>
            </Col>
            {
              videoList?.map((data, index) => (
                <Col lg={4} md={6} key={index}>
                  <iframe
                    src={data.link}
                    title={data.title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </Col>
              ))
            }
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default VideoGallery;
