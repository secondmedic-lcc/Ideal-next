/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getPhotosList } from "@/services/admin/photosListService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { imageUrl } from "@/services/baseUrl";

const PhotoItem = ({ src, alt, onClick }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
    <a href="#" className="photo-wrapper" onClick={onClick}>
      <img
        src={src}
        width={600}
        height={500}
        alt={alt}
        className="img-fluid"
      />
    </a>
  </Col>
);


const ImageModal = ({ src, alt, onClose, isOpen }) => {
  const modalClass = isOpen
    ? "image-modal-backdrop open"
    : "image-modal-backdrop";
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className={modalClass} onClick={onClose}>
      <div className="image-modal-content" onClick={handleContentClick}>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <img
          key={src}
          src={src}
          width={1200}
          height={900}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "calc(100vh - 120px)",
            objectFit: "contain",
          }}
        />
        <div className="image-caption">
          {alt}
        </div>
      </div>
    </div>
  );
};


const PhotoGallery = () => {

  const params = useParams();
  const photo_slug = params?.photo_slug;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [currentImageAlt, setCurrentImageAlt] = useState("");

  const openModal = (src, alt) => {
    setCurrentImageSrc(src);
    setCurrentImageAlt(alt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos-list", photo_slug],
    queryFn: () => getPhotosList({photo_slug}),
    enabled: !!photo_slug,
  });
  
  const photoGalleryList = data?.data?.list || data?.list || [];

  return (
    <>
      <Header />
      <section className="gallery-page section-padding">
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className="web-heading">Photo Gallery</h2>
              <div className="text-center mb-5">
                <Link href="/gallery/photos" className="back-btn">
                  <FaArrowLeftLong /> Go Back To Albums
                </Link>
              </div>
            </Col>
            {photoGalleryList.map((photo, index) => (
              <PhotoItem
                key={index}
                src={imageUrl+photo.image}
                alt={photo.title}
                onClick={(e) => {
                  e.preventDefault();
                  openModal(imageUrl+photo.image, photo.title);
                }}
              />
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
      {/* The ImageModal is always rendered but its content is only shown when isOpen is true */}
      <ImageModal
        src={currentImageSrc}
        alt={currentImageAlt}
        onClose={closeModal}
        isOpen={isModalOpen} // Pass isOpen state directly
      />
    </>
  );
};

export default PhotoGallery;
