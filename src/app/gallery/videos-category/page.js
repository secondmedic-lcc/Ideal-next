"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getVideoCategories } from "@/services/admin/galleryVideoService";

const VideoCategoryPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["video-categories"],
    queryFn: () => getVideoCategories({ status: 1 }),
  });

  const categoryList = data?.data?.list || data?.data || [];

  return (
    <>
      <Header />

      <div className="heading">
        <h1 className="web-heading clr-green">VIDEO CATEGORIES</h1>
      </div>

      <section className="gallery-page section-padding">
        <Container>
            <Row className="g-4">
            {isLoading && (
                <Col xs={12} className="text-center py-5">
                Loading...
                </Col>
            )}

            {isError && (
                <Col xs={12} className="text-center py-5">
                Error loading categories
                </Col>
            )}

            {!isLoading && !isError && categoryList?.length === 0 && (
                <Col xs={12} className="text-center py-5">
                No categories found
                </Col>
            )}

            {categoryList?.map((cat) => (
                <Col key={cat.id} lg={4} md={6} sm={12}>
                <div
                    style={{
                    background: "#fff",
                    borderRadius: 14,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    height: "100%",
                    overflow: "hidden",
                    }}
                >
                    {/* Placeholder Image */}
                    <img
                    src="https://thumbs.dreamstime.com/b/hand-worker-touchs-button-businessman-touching-gold-financial-business-virtual-screen-87761473.jpg"
                    alt={cat.title}
                    style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                    }}
                    />

                    {/* Content */}
                    <div style={{ padding: 18 }}>
                    <h3 style={{ fontSize: 20, marginBottom: 10 }}>
                        {cat.title}
                    </h3>

                    <Link
                        href={`/gallery/videos-category/${cat.id}`}
                        style={{
                        display: "inline-block",
                        marginTop: 6,
                        textDecoration: "none",
                        fontWeight: 600,
                        color: "#0d6efd",
                        }}
                    >
                        View Videos →
                    </Link>
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

export default VideoCategoryPage;
