/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { getBrands } from "@/services/admin/brandServices";
import { imageUrl } from "@/services/baseUrl";
import { useQuery } from "@tanstack/react-query";

// Define a reusable component for a single brand card
const BrandCard = ({ logoSrc, name, description, link }) => (
  <Col lg={4} md={6} className="mb-4">
    <div className="brand-card">
      <div className="brand-logo-wrapper">
        <img
          src={logoSrc}
          alt={`${name}`}
          width={250}
          height={100}
          className="brand-logo"
        />
      </div>
      <p className="web-para brand-description">{description}</p>
      <Link href={link} className="web-btn brand-read-more-btn">
        Read More
      </Link>
    </div>
  </Col>
);

const BrandsPage = () => {
  
  const { data,isLoading, isError  } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const brandsData = data?.data?.list || data?.list;

  return (
    <>
      <Header />

      {/* --- BRANDS LIST SECTION --- */}
      <section className="section-padding brands-page-section">
        <Container>
          <Row>
            <Col xs={12} className="text-center mb-5">
              <h1 className="web-heading">Our Brands</h1>
            </Col>
          </Row>
          <>
            {isLoading && <div className="text-center p-5">Loading...</div>}
            {isError && <div className="text-center p-5">Error loading brands list</div>}
          </>
          <Row className="g-4">
            {brandsData?.map((brand, index) => (
              <BrandCard
                key={index}
                logoSrc={imageUrl+brand.brand_logo}
                name={brand.title}
                description={brand.small_description}
                link={`/brands/${brand.brand_slug}`}
              />
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default BrandsPage;
