"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { getPageContents, updatePageContent } from "@/services/admin/pageContentServices";
import swal from "sweetalert";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

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

  const handleChange = (index, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const mutation = useMutation({
    mutationFn: ({ id, payload }) => updatePageContent(id, payload),
    onSuccess: () => {
      swal("Thank you", "Page content updated successfully!", "success");
      queryClient.invalidateQueries(["page-content", pageName]);
    },
    onError: () => {
      swal("Error", "Failed to update!", "error");
    },
  });

  const handleSubmit = (e, index) => {
    e.preventDefault();

    const original = pageContentList[index];
    const updated = formValues[index] || {};

    const payload = {
      title: updated.title ?? original?.title ?? "",
      subtitle: updated.subtitle ?? original?.subtitle ?? "",
      description: updated.description ?? original?.description ?? "",
    };

    mutation.mutate({
      id: original.id, 
      payload,
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

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              Manage {pageContentList[0]?.page_name || "Page"}
            </div>

            {pageContentList.map((data, index) => (
              <div className="card-body border-bottom" key={index}>
                <form onSubmit={(e) => handleSubmit(e, index)}>
                  <div className="row">
                    
                    {/* Title */}
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formValues[index]?.title ?? data.title ?? ""}
                          onChange={(e) =>
                            handleChange(index, "title", e.target.value)
                          }
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Sub Title */}
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>Sub Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formValues[index]?.subtitle ?? data.subtitle ?? ""}
                          onChange={(e) =>
                            handleChange(index, "subtitle", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Description (Quill) */}
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <label>Description</label>
                        <ReactQuill
                          theme="snow"
                          value={
                            formValues[index]?.description ??
                            data.description ??
                            ""
                          }
                          onChange={(val) =>
                            handleChange(index, "description", val)
                          }
                        />
                      </div>
                    </div>

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
      </div>
    </div>
  );
};

export default PageContent;
