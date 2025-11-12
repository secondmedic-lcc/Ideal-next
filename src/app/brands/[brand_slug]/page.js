/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useParams } from "next/navigation";
import { imageUrl } from "@/services/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { getBrandById } from "@/services/admin/brandServices";

const BrandDetails = () => {
  const params = useParams();
  const brand_slug = params?.brand_slug;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["brand-details", brand_slug],
    queryFn: () => getBrandById(brand_slug),
    enabled: !!brand_slug,
  });

  const currentBrand = data?.data || data;

  console.log(currentBrand);
  console.log(brand_slug);

  return (
    <>
      <Header />
      
      <>
        {
          isLoading && <div className="text-center p-5">Loading...</div>
        }
        {isError && <div>Error loading brands list</div>}
      </>

      {/* --- BRAND DETAILS SECTION --- */}
      <section className="section-padding brand-details-page">
        <Container>
          <Row>
            <Col xs={12} className="text-center mb-5">
              <h1 className="web-heading brand-detail-heading">
                {currentBrand?.title}
              </h1>
              <div className="text-center mb-5">
                <Link href="/brands" className="back-btn">
                  <FaArrowLeftLong /> Go Back To Brands List
                </Link>
              </div>
            </Col>
          </Row>

          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h2 className="brand-detail-subtitle">
                {currentBrand?.subtitle}
              </h2>

              <div className="web-para brand-detail-text">
                {currentBrand?.small_description}
              </div>
              <div className="web-para brand-detail-text"
                dangerouslySetInnerHTML={{ __html: currentBrand?.long_description || "" }}
              ></div>

              {/* Feature List */}
              <h3 className="brand-detail-list-title">Key Program Features:</h3>
              <div className="common-check-list brand-detail-list"
                dangerouslySetInnerHTML={{ __html: currentBrand?.key_features || "" }}
              ></div>
            </Col>

            <Col lg={6} className="d-flex justify-content-center">
              {/* Brand Image */}
              <div className="brand-detail-image-wrapper">
                <img
                  src={imageUrl + currentBrand?.brand_logo}
                  alt={currentBrand?.title}
                  width={600}
                  height={450}
                  className="brand-detail-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default BrandDetails;
