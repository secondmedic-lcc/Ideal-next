"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getGalleryVideos } from "@/services/admin/galleryVideoService";

const VideosByCategoryId = () => {
  const params = useParams();
  const id = params?.id;

  const categoryId = id ? Number(id) : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery-videos-by-category-id", categoryId],
    queryFn: () =>
      getGalleryVideos({
        video_category_id: categoryId,
        page: 1,
        limit: 50,
        status: 1,
      }),
    enabled: !!categoryId,
  });

  const videoList = data?.data?.list || [];

  return (
    <>
      <Header />

      <div className="heading">
        <h1 className="web-heading clr-green">VIDEO GALLERY</h1>
      </div>

      <section className="gallery-page section-padding">
        <Container>
          <Row className="mb-3">
            <Col xs={12}>
              <Link
                href="/gallery/videos-category"
                style={{ textDecoration: "none", fontWeight: 600 }}
              >
                ← Back to Categories
              </Link>
            </Col>
          </Row>

          <Row className="g-4">
            {isLoading && (
              <Col xs={12} className="text-center py-5">
                Loading...
              </Col>
            )}

            {isError && (
              <Col xs={12} className="text-center py-5">
                Error loading videos
              </Col>
            )}

            {!isLoading && !isError && videoList?.length === 0 && (
              <Col xs={12} className="text-center py-5">
                No videos found for this category
              </Col>
            )}

            {videoList?.map((item) => (
              <Col key={item.id} lg={4} md={6} sm={12}>
                <div
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    background: "#fff",
                  }}
                >
                  <iframe
                    src={item.link}
                    title={item.title || "Video"}
                    width="100%"
                    height="260"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  <div style={{ padding: 12 }}>
                    <div style={{ fontWeight: 700 }}>{item.title}</div>
                  </div>
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

export default VideosByCategoryId;
