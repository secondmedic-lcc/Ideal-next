"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { imageUrl } from "@/services/baseUrl";
import {
  listHomeSlider,
} from "@/services/admin/customPageSectionsServices";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MoreHomeSlider = ({page_id}) => {
    
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    if (!page_id) return;

    let isMounted = true;

    (async () => {
      try {
        const res = await listHomeSlider(page_id);
        setSliders(res?.data?.list || []);
      } catch (e) {
        setSliders([]);
      }
    })();

    return () => {
      isMounted = false;
    };
    
  }, [page_id]);

  if (!sliders.length) return null;

  return (
    <section className="home-banner-slider">
      <Row className="g-0">
        <Col>
          <Carousel
            swipeable={false}
            draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            transitionDuration={500}
            arrows={true}
            dotListClass="custom-dot-list"
          >
            {sliders.map((item) => (
              <div key={item.id}>
                {item.image && (
                  <img
                    src={`${imageUrl}${item.image}`}
                    alt={item.title}
                    width={400}
                    height={400}
                    style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                  />
                )}
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </section>
  );
};

export default MoreHomeSlider;
