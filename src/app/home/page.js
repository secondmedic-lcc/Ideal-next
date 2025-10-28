"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import HomeSlider from "../components/HomeSlider";
import HomeFuture from "../components/HomeFuture";
import HomeMilestone from "../components/HomeMilestone";

const HomePage = () => {
  return (
    <>
      <Header />
      <HomeSlider />
      <HomeFuture />
      <HomeMilestone />
    </>
  );
};

export default HomePage;
