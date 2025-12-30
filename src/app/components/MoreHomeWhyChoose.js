"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";
import { getPhotoGallery, } from "@/services/admin/whyChooseServices";
import { useQuery } from "@tanstack/react-query";
import { imageUrl } from "@/services/baseUrl";
import {
  getSection3,
  listHomeSlider
} from "@/services/admin/customPageSectionsThreeServices";

const MoreHomeWhyChoose = ({page_id}) => {
  const { data } = useQuery({
    queryKey: ["more-section-3", page_id],
    queryFn: () => listHomeSlider(page_id),
    enabled: !!page_id
  });
  const { data: titleData } = useQuery({
    queryKey: ["more-section-3-title", page_id],
    queryFn: () => getSection3(page_id),
    enabled: !!page_id
  });

  const photoGalleryList = data?.data?.list || data?.list || [];

  const reasons = photoGalleryList.map(item => ({
    iconSrc: imageUrl + item.image,
    title: item.title,
  }));
  
  if (reasons.length == 0) return;
  
  return (
    <>
      <section className="home-why-choose-section section-padding">
        <Container>
          <Row className="g-md-5 g-4 align-items-center">
            <Col xs={12}>
                <h2 className="web-heading">
                    {titleData?.data?.row?.title ? String(titleData?.data?.row?.title) : ""}
                </h2>
                {/* <h2 className="web-heading">
                    WHY CHOOSE IDEAL CLASSES FOR <br />
                    <span className="theme-clr">YOUR ACADEMIC SUCCESS:</span>
                </h2> */}
            </Col>

            {reasons.map((reason) => (
              <Col
                xs={6}
                md={4}
                key={reason.title.replace(/\s/g, "-").toLowerCase()}
              >
                <div className="why-choose-box">
                  <div className="icon-div">
                    <img
                      src={reason.iconSrc}
                      alt={`${reason.title} icon`}
                      width={200}
                      height={200}
                      className="admin-table-image"
                    />
                    {/* <Image
                      src={reason.iconSrc}
                      alt={`${reason.title} icon`}
                      width={200}
                      height={200}
                    /> */}
                  </div>
                  <h4 className="why-choose-title">{reason.title}</h4>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MoreHomeWhyChoose;
