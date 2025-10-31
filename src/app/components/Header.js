"use client";

import { useState } from "react"; // Added 'useState' for collapse state
import Image from "next/image";
import Link from "next/link";
import {
  Col,
  Container,
  Row,
  Offcanvas,
  Dropdown,
  Collapse,
} from "react-bootstrap"; // Added 'Collapse'
import { TbMenu4 } from "react-icons/tb";

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
  const [show, setShow] = useState(false); // State to manage which submenu is open (stores the 'name' of the collapsed item)
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleClose = () => {
    setShow(false);
    setOpenSubmenu(null); // Close any open submenus when offcanvas closes
  };
  const handleShow = () => setShow(true); // Toggle the submenu open state

  const toggleSubmenu = (itemName) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };
  return (
    <>
      <header>
        <section className="top-logo-header">
          <Container>
            <Row>
              <Col>
                <div className="top-header-flex">
                  <Link href="/">
                    <Image
                      src="/img/logo.png"
                      alt="Logo"
                      width={300}
                      height={150}
                      className="logo"
                    />
                  </Link>
                  <button className="menu-btn" onClick={handleShow}>
                    <TbMenu4 />
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            className="sidebar-menu"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Menu using Collapse/Accordion logic */}
              <ul className="list-unstyled p-0">
                {menuData.map((item) => (
                  <li key={item.name} className="mb-2">
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          aria-controls={`collapse-${item.name.toLowerCase()}`}
                          aria-expanded={openSubmenu === item.name}
                          // Applying existing button/link styles for theme consistency
                          className="text-dark text-decoration-none d-block w-100 text-start p-2 border btn btn-link"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {item.name}
                        </button>
                        <Collapse in={openSubmenu === item.name}>
                          <div id={`collapse-${item.name.toLowerCase()}`}>
                            <ul className="list-unstyled p-0 ps-3">
                              {item.submenu.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="text-dark text-decoration-none d-block p-2"
                                    onClick={handleClose}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Collapse>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-dark text-decoration-none d-block p-2 border"
                        onClick={handleClose}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </section>
        <section className="header-menu">
          <Container>
            <Row>
              <Col>
                <div className="menu-wrapper">
                  <ul className="list-unstyled d-flex align-items-center mb-0">
                    {menuItems.map((item) => (
                      <li key={item.name}>
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
                          <Link
                            href={item.href}
                            className="text-white text-decoration-none"
                          >
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
