"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";

const Header = () => {

  return (
    <>
      <header>
        <section className="top-logo-header">
          <Container>
            <Row>
              <Col>
                <Link href="/"><Image src="/img/logo.png" alt="Logo" width={300} height={150} className="logo"/></Link>
              </Col>
            </Row>
          </Container>
        </section>
      </header>
    </>
  );
};

export default Header;
