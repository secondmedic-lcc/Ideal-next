"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";

const menuItems = [
  { name: "About Us", href: "/about-us" },
  { name: "Courses", href: "/courses" },
  { name: "Online Learning", href: "/online-learning" },
  { name: "Brands", href: "/brands" },
  { name: "CSR", href: "/csr" },
  { name: "Gallery", href: "/gallery" },
  { name: "Careers", href: "/careers" },
  { name: "Franchise Proposal", href: "/franchise-proposal" },
  { name: "Contact Us", href: "/contact-us" },
];

const Header = ({ menuData = menuItems }) => {
  return (
    <>
      <header>
        <section className="top-logo-header">
          <Container>
            <Row>
              <Col>
                <Link href="/">
                  <Image
                    src="/img/logo.png"
                    alt="Logo"
                    width={300}
                    height={150}
                    className="logo"
                  />
                </Link>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="header-menu">
          <Container>
            <Row>
              <Col>
                <div className="menu-wrapper">
                  <ul>
                    {menuData.map((item) => (
                      <li key={item.name.replace(/\s/g, "-").toLowerCase()}>
                        <Link href={item.href}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </header>
    </>
  );
};

export default Header;
