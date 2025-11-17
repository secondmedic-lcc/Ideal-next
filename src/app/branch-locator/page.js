"use client";

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getBranchLocators } from "@/services/admin/branchLocatorServices";
import { getStateListByCountry, getCityListByState } from "@/services/admin/listServices";

const Branch = () => {

  const [selectedState, setSelectedState] = useState("");

  const { data: branchData } = useQuery({
    queryKey: ["branch-locators"],
    queryFn: () => getBranchLocators({ page: 1, limit: 100 }),
  });

  const branchList = branchData?.data?.list || [];

  // -------------------------------
  // Load State List (Static Country 101)
  // -------------------------------
  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStateListByCountry(101), // India
  });

  const stateList = stateData?.data?.list || [];

  // -------------------------------
  // Load City List (Dynamic when state changes)
  // -------------------------------
  const { data: cityData } = useQuery({
    queryKey: ["cities", selectedState],
    queryFn: () => getCityListByState(selectedState),
    enabled: !!selectedState,   // <-- IMPORTANT (prevents auto-call)
  });

  const cityList = cityData?.data?.list || [];

  return (
    <>
      <Header />

      <div className="heading">
        <h1 className="web-heading mb-0">Branch Locator</h1>
      </div>

      <section className="store-locator-section section-padding">
        <Container>

          {/* Filters */}
          <div className="store-locator-header">
            <Row className="align-items-center">

              {/* STATE DROPDOWN */}
              <Col lg={4} md={6}>
                <label className="store-locator-label">Select State</label>
                <select
                  className="store-locator-select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value=""> -- -- </option>
                  {stateList.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  ))}
                </select>
              </Col>

              {/* CITY DROPDOWN */}
              <Col lg={4} md={6}>
                <label className="store-locator-label">Select City</label>
                <select className="store-locator-select">
                  <option value=""> -- -- </option>

                  {cityList.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  ))}
                </select>
              </Col>

              {/* BRANCH DROPDOWN */}
              <Col lg={4} md={6}>
                <label className="store-locator-label">Select Branch</label>
                <select className="store-locator-select">
                  <option value=""> -- -- </option>
                  {branchList.map((b) => (
                    <option value={b.id} key={b.id}>{b.name}</option>
                  ))}
                </select>
              </Col>

            </Row>
          </div>

          {/* Results */}
          <Row className="store-locator-result">
            <Col lg={12}>
              <h3 className="store-locator-result-title">Result: {branchList.length}</h3>
              <hr className="store-locator-divider" />

              <div className="store-locator-box">
                {branchList.map((data, index) => (
                  <div className="store-locator-branch" key={index}>
                    <div className="branch-index">{index + 1}</div>

                    <div className="branch-content">
                      <div className="branch-title">{data.name}</div>
                      <div className="branch-meta">
                        <div><strong>Address:</strong> {data.address}</div>
                        <div><strong>Contact:</strong> {data.contact}</div>
                        <div><strong>Email:</strong> {data.email}</div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </Col>
          </Row>

        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Branch;
