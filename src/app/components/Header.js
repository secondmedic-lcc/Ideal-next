"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row, Offcanvas, Dropdown } from "react-bootstrap";

const menuItems = [
  { name: "About Us", href: "/about-us" },
  {
    name: "Courses",
    submenu: [
      { name: "Commerce", href: "/courses" },
      { name: "Science", href: "/courses/science" },
      { name: "Arts", href: "/courses/arts" },
    ],
  },
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
              <ul className="list-unstyled d-flex align-items-center mb-0">
                {menuItems.map((item) => (
                  <li
                   
                  >
                    {/* If has submenu, use dropdown */}
                    {item.submenu ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          id={`dropdown-${item.name.toLowerCase()}`}
                          variant="link"
                          className="text-white text-decoration-none p-0"
                        >
                          {item.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {item.submenu.map((subItem) => (
                            <Dropdown.Item
                              as={Link}
                              href={subItem.href}
                              key={subItem.name}
                            >
                              {subItem.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Link href={item.href} className="text-white text-decoration-none">
                        {item.name}
                      </Link>
                    )}
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
