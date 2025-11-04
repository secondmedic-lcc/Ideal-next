"use client";

import React, { useState, useEffect } from "react"; // Import useEffect
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FaTimes } from "react-icons/fa"; // FaTimes for close button
import { FaArrowLeftLong } from "react-icons/fa6";

// --- Reusable Photo Item Component ---
const PhotoItem = ({ src, alt, onClick }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
    <a href="#" className="photo-wrapper" onClick={onClick}>
      <Image
        src={src}
        width={600}
        height={500}
        alt={alt}
        className="img-fluid" // Added for responsiveness
        // style={{ width: "100%", height: "auto", display: "block" }} // Ensure image fills its container
      />
    </a>
  </Col>
);

// --- Enhanced Image Modal Component ---
const ImageModal = ({ src, alt, onClose, isOpen }) => {
  // Add a class for animating the modal in/out
  const modalClass = isOpen
    ? "image-modal-backdrop open"
    : "image-modal-backdrop";

  // This prevents the modal content click from propagating to the backdrop
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null; // Only render when isOpen is true

  return (
    <div className={modalClass} onClick={onClose}>
      <div className="image-modal-content" onClick={handleContentClick}>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        {/* Using key={src} ensures the Image component re-renders when src changes */}
        <Image
          key={src}
          src={src}
          width={1200} // Larger default size for modal viewing
          height={900}
          alt={alt}
          // CSS for responsive scaling within the modal
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "calc(100vh - 120px)",
            objectFit: "contain",
          }}
        />
        <div className="image-caption">
          {alt} {/* Display alt text as a caption */}
        </div>
      </div>
    </div>
  );
};

// --- Main Gallery Component ---
const PhotoGallery = () => {
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
    // No need to clear src/alt immediately, let animation play out if needed
  };

  // Effect to manage body scroll when modal is open/closed
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Prevent body scroll
    } else {
      document.body.style.overflow = ""; // Restore body scroll
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = ""; // Ensure scroll is restored on component unmount
    };
  }, [isModalOpen]); // Rerun when isModalOpen changes

  // Example list of photo data (replace with your actual data source)
  const photos = [
    { src: "/img/photo-cat-1.jpg", alt: "Golden Gate Bridge at Sunset" },
    { src: "/img/photo-cat-2.jpg", alt: "Lush Green Forest Path" },
    { src: "/img/photo-cat-3.jpg", alt: "City Skyline at Night" },
    { src: "/img/photo-cat-4.jpg", alt: "Snow-capped Mountains with Lake" },
    // Add more photos here...
  ];

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
            {photos.map((photo, index) => (
              <PhotoItem
                key={index}
                src={photo.src}
                alt={photo.alt}
                onClick={(e) => {
                  e.preventDefault();
                  openModal(photo.src, photo.alt);
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
