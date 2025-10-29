"use client";

import React from "react";
import Header from "../components/Header";
import HomeSlider from "../components/HomeSlider";
import HomeFuture from "../components/HomeFuture";
import HomeMilestone from "../components/HomeMilestone";
import HomeWhyChoose from "../components/HomeWhyChoose";
import HomeTestimonials from "../components/HomeTestimonials";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <HomeSlider />
      <HomeFuture />
      <HomeMilestone />
      <HomeWhyChoose />
      <HomeTestimonials />
      <Footer />
    </>
  );
};

export default HomePage;
