/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getPhotoGallery } from "@/services/admin/photoGalleryServices";
import { imageUrl } from "@/services/baseUrl";
import { useQuery } from "@tanstack/react-query";

const FALLBACK_IMAGE = "/images/placeholder-600x400.png";

const PhotoGalleryList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["photo-gallery"],
    queryFn: getPhotoGallery,
  });

  const photoGallery = Array.isArray(data?.data?.list) ? data.data.list : [];

  if (isLoading) {
    return (
      <>
        <Header />
        <section className="gallery-page section-padding">
          <Container>
            <Row>
              <Col xs={12}>
                <h2 className="web-heading">Photo Gallery</h2>
              </Col>
              <Col xs={12}>
                <div className="text-center py-5">Loading photos…</div>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    console.error("Failed to load photo gallery:", error);
    return (
      <>
        <Header />
        <section className="gallery-page section-padding">
          <Container>
            <Row>
              <Col xs={12}>
                <h2 className="web-heading">Photo Gallery</h2>
              </Col>
              <Col xs={12}>
                <div className="text-center py-5 text-danger">Failed to load photo gallery.</div>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="gallery-page section-padding">
        <Container>
          <Row className="g-4">
            <Col xs={12}>
              <h2 className="web-heading">Photo Gallery</h2>
            </Col>

            {photoGallery.length === 0 ? (
              <Col xs={12}>
                <div className="text-center py-4">No photos available.</div>
              </Col>
            ) : (
              photoGallery.map((category) => {
                const key = category?.id ?? slug;
                const imgPath =
                  category?.image && typeof category.image === "string" ? `${imageUrl}${category.image}` : FALLBACK_IMAGE;

                const href = `/gallery/photos/${category?.slug}`;

                return (
                  <Col lg={3} md={6} key={key}>
                    <Link href={href} className="photo-wrapper">
                      {/* next/image requires a valid src — we ensure it's a string */}
                      <div style={{ position: "relative", width: "100%", aspectRatio: "6/5" }}>
                        <img
                          src={imgPath}
                          alt={category?.title || "Photo"}
                          fill
                          style={{ objectFit: "cover", borderRadius: 6 }}
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>

                      <div className="photo-content">
                        <h4>{category?.title || "Untitled"}</h4>
                      </div>
                    </Link>
                  </Col>
                );
              })
            )}
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default PhotoGalleryList;
