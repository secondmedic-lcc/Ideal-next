"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "next/navigation";
import MoreHomeSlider from "@/app/components/MoreHomeSlider";
import {
  getPhotoGallery as getMorePages
} from "@/services/admin/customPageServices";
import { useQuery } from "@tanstack/react-query";
import MoreHomeFuture from "@/app/components/MoreHomeFuture";
import MoreHomeMilestone from "@/app/components/MoreHomeMilestone";
import MoreHomeWhyChoose from "@/app/components/MoreHomeWhyChoose";
import Script from "next/script";

const CustomPage = () => {
    const { slug } = useParams();

    const { data: customPage } = useQuery({
        queryKey: ["custom-page", slug],
        queryFn: () => getMorePages(slug),
    });
    
    const pageData = customPage?.data?.list[0] || "";

    const cleanScript = pageData?.js_scripts
  ?.replace(/<script.*?>/gi, "")
  ?.replace(/<\/script>/gi, "");

    return (
        <>
            {/* 🔥 Dynamic SEO / Analytics JS */}
            {cleanScript && (
                <Script
                    id="dynamic-seo-js"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: cleanScript,
                    }}
                />
            )}

            <Header />
            <MoreHomeSlider page_id={pageData?.id} />
            <MoreHomeFuture page_id={pageData?.id} />
            <MoreHomeMilestone page_id={pageData?.id} />
            <MoreHomeWhyChoose page_id={pageData?.id} />
            <Footer />
        </>
    );
};

export default CustomPage;
