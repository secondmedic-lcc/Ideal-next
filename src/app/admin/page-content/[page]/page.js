/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
import {
  getPageContents,
  updatePageContent,
} from "@/services/admin/pageContentServices";
import { imageUrl } from "@/services/baseUrl";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { Container } from "react-bootstrap";

const PageContent = () => {
  const params = useParams();
  const pageName = params.page;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["page-content", pageName],
    queryFn: () => getPageContents({ page_name: pageName }),
    enabled: !!pageName,
  });

  const pageContentList = data?.data?.list || [];

  const [formValues, setFormValues] = useState({});
  const [previewImages, setPreviewImages] = useState({});

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

    setPreviewImages((prev) => ({
      ...prev,
      [index]: URL.createObjectURL(file),
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
    formData.append(
      "description",
      updated.description ?? original.description ?? ""
    );

    if (updated.image instanceof File) {
      formData.append("image", updated.image);
    }

    mutation.mutate({ id: original.id, payload: formData });
  };

  if (isLoading) {
    return <div className="container mt-4">Loading page content…</div>;
  }

  if (isError) {
    return (
      <div className="container mt-4 text-danger">
        Failed to load page content.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="card">
        {/* Header */}
        <div className="card-header bg-white p-3">
          <h5 className="mb-0">
            Manage Page Content –{" "}
            <span className="text-muted">
              {pageContentList[0]?.page_name || ""}
            </span>
          </h5>
        </div>

        {/* Sections */}
        {pageContentList.map((section, index) => (
          <div className="card-body border-top" key={section.id || index}>
            <form onSubmit={(e) => handleSubmit(e, index)}>
              <div className="row">
                {/* Title */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Section Title
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    value={formValues[index]?.title ?? section.title ?? ""}
                    readOnly
                  />
                </div>

                {/* Subtitle */}
                {section.subtitle && (
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Subtitle</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        formValues[index]?.subtitle ?? section.subtitle ?? ""
                      }
                      onChange={(e) =>
                        handleChange(index, "subtitle", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* Description */}
                {section.description && (
                  <div className="col-md-8 mb-3">
                    <label className="form-label fw-semibold">
                      Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={
                        formValues[index]?.description ??
                        section.description ??
                        ""
                      }
                      onChange={(val) =>
                        handleChange(index, "description", val)
                      }
                      style={{ minHeight: "180px" }}
                    />
                  </div>
                )}

                {/* Image */}
                {section.image && (
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      Section Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />

                    <div className="mt-3">
                      <img
                        src={
                          previewImages[index]
                            ? previewImages[index]
                            : section.image
                            ? `${imageUrl}${section.image}`
                            : ""
                        }
                        alt="Preview"
                        className="rounded border"
                        style={{
                          maxWidth: "180px",
                          maxHeight: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Button */}
                <div className="col-12 mt-2">
                  <button
                    type="submit"
                    className="theme-btn"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Updating..." : "Update Section"}
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
