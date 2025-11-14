/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { getPageContents, updatePageContent } from "@/services/admin/pageContentServices";
import swal from "sweetalert";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { imageUrl } from "@/services/baseUrl";

const PageContent = () => {
  const params = useParams();
  const pageName = params.page;

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["page-content", pageName],
    queryFn: () => getPageContents({ page_name: pageName }),
    enabled: !!pageName,
  });

  const pageContentList = data?.data?.list || [];

  const [formValues, setFormValues] = useState({});
  const [previewImages, setPreviewImages] = useState({});

  /** Handle text + description changes */
  const handleChange = (index, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const handleImageChange = (index, file) => {
    if (!file) return;

    setFormValues((prev) => ({
      ...prev,
      [index]: { ...prev[index], image: file },
    }));

    const url = URL.createObjectURL(file);
    setPreviewImages((prev) => ({
      ...prev,
      [index]: url,
    }));
  };

  const mutation = useMutation({
    mutationFn: ({ id, payload }) => updatePageContent(id, payload),
    onSuccess: () => {
      swal("Success", "Page content updated successfully!", "success");
      queryClient.invalidateQueries(["page-content", pageName]);
    },
    onError: () => {
      swal("Error", "Failed to update content", "error");
    },
  });

  const handleSubmit = (e, index) => {
    e.preventDefault();

    const original = pageContentList[index];
    const updated = formValues[index] || {};

    const formData = new FormData();

    formData.append("title", updated.title ?? original.title ?? "");
    formData.append("subtitle", updated.subtitle ?? original.subtitle ?? "");
    formData.append("description", updated.description ?? original.description ?? "");

    if (updated.image instanceof File) {
      formData.append("image", updated.image);
    }

    mutation.mutate({
      id: original.id,
      payload: formData,
    });
  };

  if (isLoading)
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Loading page content...</div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Failed to load page content.</div>
      </div>
    );

  /* UI Rendering */
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-white">
          Manage {pageContentList[0]?.page_name || "Page"}
        </div>

        {pageContentList.map((data, index) => (
          <div className="card-body border-bottom" key={index}>
            <form onSubmit={(e) => handleSubmit(e, index)}>
              <div className="row">

                {/* Title */}
                <div className="col-md-6 mb-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues[index]?.title ?? data.title ?? ""}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    readOnly
                  />
                </div>

                {/* Subtitle (shown only if exists) */}
                {data.subtitle && (
                  <div className="col-md-6 mb-3">
                    <label>Sub Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues[index]?.subtitle ?? data.subtitle ?? ""}
                      onChange={(e) => handleChange(index, "subtitle", e.target.value)}
                    />
                  </div>
                )}

                {/* Description */}
                {data.description && (
                  <div className="col-md-8 mb-3">
                    <label>Description</label>
                    <ReactQuill
                      theme="snow"
                      value={
                        formValues[index]?.description ??
                        data.description ??
                        ""
                      }
                      onChange={(val) => handleChange(index, "description", val)}
                    />
                  </div>)
                }

                {/* Image Upload */}
                { data.image &&
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e.target.files[0])}
                    />

                    {/* Show preview */}
                    <div className="mt-2">
                      <img
                        src={
                          previewImages[index]
                            ? previewImages[index]
                            : data.image
                            ? `${imageUrl}${data.image}`
                            : ""
                        }
                        alt=""
                        className="rounded"
                        style={{ maxWidth: "180px", maxHeight: "120px" }}
                      />
                    </div>
                  </div>
                }

                {/* Submit Button */}
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary">
                    {mutation.isPending ? "Updating..." : "Update Details"}
                  </button>
                </div>

              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageContent;
