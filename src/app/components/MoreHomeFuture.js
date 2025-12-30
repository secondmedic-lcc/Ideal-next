"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import parse from "html-react-parser";
import {
  getSection1,
} from "@/services/admin/customPageSectionsServices";
import { imageUrl } from "@/services/baseUrl";

const MoreHomeFuture = ({page_id}) => {
  const [row, setRow] = useState(null);

  useEffect(() => {
    if (!page_id) return;

    let isMounted = true;

    (async () => {
      try {
        const res = await getSection1(page_id);
        const item = res?.data?.row || null;
        setRow(item);
      } catch (e) {
        setRow(null);
      }
    })();
    
    return () => {
      isMounted = false;
    };
    
  }, [page_id]);

  if (!row) return null;

 
  if (Number(row.status) === 1) return null;

  return (
    <section className="home-future-section section-padding">
      <Container>
        <Row className="g-md-5 g-3 align-items-center">
          <Col xs={12}>
            <h2 className="web-heading">
              {row.title ? parse(String(row.title)) : ""}
            </h2>
          </Col>

          <Col xs={12} md={8} className="order-2 order-md-1">
            <p className="home-future-para">
              {row.description ? parse(String(row.description)) : ""}
            </p>
          </Col>

          <Col xs={12} md={4} className="order-1 order-md-2">
            {row.image ? (
              <img
                  src={`${imageUrl}${row.image}`}
                  alt="Features Image"
                  width={400}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                />
            ) : null}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MoreHomeFuture;
