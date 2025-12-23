"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSeoMetaList } from "@/services/admin/pageContentServices.js";
import SeoMetaTable from "./SeoMetaTable";

export default function SeoMetaPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["seo-meta-list"],
    queryFn: getSeoMetaList,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">SEO Meta Management</h5>
      </div>

      <div className="card-body">
        <SeoMetaTable list={data?.data?.list || []} />
      </div>
    </div>
  );
}
