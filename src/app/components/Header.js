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
import { IoClose } from "react-icons/io5";
import { getCourses } from "@/services/admin/courseService";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });

  const courseList = data?.data?.list || data?.list || [];

  const menuData = [
    { name: "About Us", href: "/about-us" },
    {
      name: "Courses",
      submenu: [
        ...courseList.map((details) => ({
          name: details.course_name,
          href: `/courses/${details.course_slug}`,
        })),
      ],
    },
    { name: "Online Learning", href: "/online-learning" },
    { name: "Brands", href: "/brands" },
    { name: "CSR", href: "/csr" },
    {
      name: "Gallery",
      submenu: [
        { name: "Photo Gallery", href: "/gallery/photos" },
        { name: "Video Gallery", href: "/gallery/videos" },
      ],
    },
    { name: "Careers", href: "/careers" },
    { name: "Franchise Proposal", href: "/franchise-proposal" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const [show, setShow] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleClose = () => {
    setShow(false);
    setOpenSubmenu(null);
  };
  const handleShow = () => setShow(true);

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
                  <button
                    className="menu-btn d-flex d-lg-none"
                    onClick={handleShow}
                  >
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
            <Offcanvas.Body>
              <div className="sidebar-header">
                <h4>Menu</h4>
                <button className="menu-close-btn" onClick={handleClose}>
                  <IoClose />
                </button>
              </div>
              <ul className="sidebar-links">
                {menuData.map((item) => (
                  <li key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          aria-controls={`collapse-${item.name.toLowerCase()}`}
                          aria-expanded={openSubmenu === item.name}
                          className="menu-btn"
                        >
                          {item.name}
                        </button>
                        <Collapse in={openSubmenu === item.name}>
                          <div id={`collapse-${item.name.toLowerCase()}`}>
                            <ul className="sub-menu">
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
                        className="menu-btn"
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
                    {menuData.map((item) => (
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
