/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
import {
  getPageContents,
  updatePageContent,
  createPageContent,
  deletePageContent,
} from "@/services/admin/pageContentServices";
import { imageUrl } from "@/services/baseUrl";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const PageContent = () => {
  const params = useParams();
  const pageName = params.page;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["page-content", pageName],
    queryFn: () => getPageContents({ page_name: pageName, page: 1, limit: 1000 }),
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

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updatePageContent(id, payload),
    onSuccess: () => {
      swal("Success", "Page content updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["page-content", pageName] });
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

    updateMutation.mutate({ id: original.id, payload: formData });
  };

  const fixedTitles = useMemo(() => {
    if (pageName === "online-learning") return new Set(["Learn@Home", "FEATURES", "UNNOBO PRO"]);
    return new Set();
  }, [pageName]);

  const showExtraPanel = pageName === "online-learning";

  const dbExtras = useMemo(() => {
    if (!showExtraPanel) return [];
    return (pageContentList || [])
      .filter((x) => x?.title && !fixedTitles.has(x.title))
      .map((x) => ({
        id: x.id,
        title: x.title || "",
        subtitle: x.subtitle || "",
        description: x.description || "",
        image: x.image || "",
      }));
  }, [pageContentList, showExtraPanel, fixedTitles]);

  const emptyExtra = () => ({
    title: "",
    subtitle: "",
    description: "",
    image: null,
    preview: "",
  });

  const [newExtras, setNewExtras] = useState([]);
  const [extraEdits, setExtraEdits] = useState({});
  const [extraPreviews, setExtraPreviews] = useState({});

  const allExtras = useMemo(() => {
    const mappedDb = dbExtras.map((x) => ({ ...x, _source: "db" }));
    const mappedNew = newExtras.map((x, i) => ({ ...x, _source: "new", _tmpKey: `new-${i}` }));
    return [...mappedDb, ...mappedNew];
  }, [dbExtras, newExtras]);

  const createMutation = useMutation({
    mutationFn: (payload) => {
      const fd = new FormData();
      fd.append("page_name", payload.page_name || "");
      fd.append("title", payload.title || "");
      fd.append("subtitle", payload.subtitle || "");
      fd.append("description", payload.description || "");
      fd.append("status", String(payload.status ?? 1));
      fd.append("dynamic_status", "1");
      if (payload.image instanceof File) fd.append("image", payload.image);
      return createPageContent(fd);
    },
    onSuccess: () => {
      swal("Success", "Section saved successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["page-content", pageName] });
    },
    onError: () => {
      swal("Error", "Failed to save section", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePageContent(id),
    onSuccess: () => {
      swal("Success", "Section removed successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["page-content", pageName] });
    },
    onError: () => {
      swal("Error", "Failed to remove section", "error");
    },
  });

  const updateExtraMutation = useMutation({
    mutationFn: ({ id, payload }) => updatePageContent(id, payload),
    onSuccess: () => {
      swal("Success", "Section updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["page-content", pageName] });
      setExtraEdits({});
      setExtraPreviews({});
    },
    onError: () => {
      swal("Error", "Failed to update section", "error");
    },
  });

  const addExtraSection = () => {
    setNewExtras((p) => [...p, emptyExtra()]);
  };

  const changeNewExtra = (idx, key, val) => {
    setNewExtras((p) => p.map((r, i) => (i === idx ? { ...r, [key]: val } : r)));
  };

  const pickNewExtraImage = (idx, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setNewExtras((p) => p.map((r, i) => (i === idx ? { ...r, image: file, preview } : r)));
  };

  const saveNewExtra = async (idx) => {
    const row = newExtras[idx];
    if (!row) return;

    if (!pageName) {
      swal("Error", "Page name missing", "error");
      return;
    }

    if (!row.title?.trim()) {
      swal("Error", "Section Title is required", "error");
      return;
    }

    const payload = {
      page_name: pageName,
      title: row.title.trim(),
      subtitle: row.subtitle || "",
      description: row.description || "",
      status: 1,
      image: row.image instanceof File ? row.image : null,
    };

    const res = await createMutation.mutateAsync(payload);

    if (res?.status === false) {
      swal("Error", res?.message || "Failed to save section", "error");
      return;
    }

    setNewExtras((p) => p.filter((_, i) => i !== idx));
  };

  const removeExtra = async (row) => {
    if (row?._source === "db" && row?.id) {
      await deleteMutation.mutateAsync(row.id);
      return;
    }

    if (row?._source === "new") {
      const newIdx = Number(String(row._tmpKey || "").split("-")[1]);
      if (!Number.isNaN(newIdx)) setNewExtras((p) => p.filter((_, i) => i !== newIdx));
    }
  };

  const getExtraKey = (row) => (row?._source === "db" ? `db-${row.id}` : row._tmpKey);

  const getExtraValue = (row, field) => {
    const k = getExtraKey(row);
    const edit = extraEdits[k] || {};
    if (field in edit) return edit[field];
    return row?.[field] ?? "";
  };

  const handleExtraChange = (row, idx, field, value) => {
    if (row?._source === "db") {
      const k = getExtraKey(row);
      setExtraEdits((prev) => ({
        ...prev,
        [k]: { ...(prev[k] || {}), [field]: value },
      }));
      return;
    }

    const newIdx = idx - dbExtras.length;
    if (newIdx >= 0) changeNewExtra(newIdx, field, value);
  };

  const handleExtraImagePick = (row, idx, file) => {
    if (!file) return;

    if (row?._source === "db") {
      const k = getExtraKey(row);
      setExtraEdits((prev) => ({
        ...prev,
        [k]: { ...(prev[k] || {}), image: file },
      }));
      setExtraPreviews((prev) => ({
        ...prev,
        [k]: URL.createObjectURL(file),
      }));
      return;
    }

    const newIdx = idx - dbExtras.length;
    if (newIdx >= 0) pickNewExtraImage(newIdx, file);
  };

  const saveExtra = async (row, idx) => {
    if (!pageName) {
      swal("Error", "Page name missing", "error");
      return;
    }

    if (row?._source === "new") {
      const newIdx = idx - dbExtras.length;
      if (newIdx >= 0) await saveNewExtra(newIdx);
      return;
    }

    if (!row?.id) return;

    const k = getExtraKey(row);
    const edited = extraEdits[k] || {};

    const title = (edited.title ?? row.title ?? "").trim();
    if (!title) {
      swal("Error", "Section Title is required", "error");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("subtitle", edited.subtitle ?? row.subtitle ?? "");
    fd.append("description", edited.description ?? row.description ?? "");
    fd.append("dynamic_status", "1");
    if (edited.image instanceof File) fd.append("image", edited.image);

    updateExtraMutation.mutate({ id: row.id, payload: fd });
  };

  if (isLoading) return <div className="container mt-4">Loading page content…</div>;
  if (isError) return <div className="container mt-4 text-danger">Failed to load page content.</div>;

  const mainSections = showExtraPanel
    ? pageContentList.filter((section) => fixedTitles.has(section.title))
    : pageContentList;

  return (
    <div className="mt-4">
      <div className="card">
        <div className="card-header bg-white p-3">
          <h5 className="mb-0">
            Manage Page Content –{" "}
            <span className="text-muted">{pageContentList[0]?.page_name || pageName || ""}</span>
          </h5>
        </div>

        {mainSections.map((section) => {
          const actualIndex = pageContentList.findIndex((x) => x.id === section.id);

          return (
            <div className="card-body border-top" key={section.id || actualIndex}>
              <form onSubmit={(e) => handleSubmit(e, actualIndex)}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Section Title</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      value={formValues[actualIndex]?.title ?? section.title ?? ""}
                      readOnly
                    />
                  </div>

                  {section.subtitle !== null && section.subtitle !== undefined && (
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Subtitle</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formValues[actualIndex]?.subtitle ?? section.subtitle ?? ""}
                        onChange={(e) => handleChange(actualIndex, "subtitle", e.target.value)}
                      />
                    </div>
                  )}

                  {section.description !== null && section.description !== undefined && (
                    <div className="col-md-8 mb-3">
                      <label className="form-label fw-semibold">Description</label>
                      <ReactQuill
                        theme="snow"
                        value={formValues[actualIndex]?.description ?? section.description ?? ""}
                        onChange={(val) => handleChange(actualIndex, "description", val)}
                        style={{ minHeight: "180px" }}
                      />
                    </div>
                  )}

                  {section.image !== null && section.image !== undefined && (
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">Section Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleImageChange(actualIndex, e.target.files?.[0])}
                      />

                      <div className="mt-3">
                        {!!(previewImages[actualIndex] || section.image) && (
                          <img
                            src={
                              previewImages[actualIndex]
                                ? previewImages[actualIndex]
                                : section.image
                                ? `${imageUrl}${section.image}`
                                : ""
                            }
                            alt="Preview"
                            className="rounded border"
                            style={{ maxWidth: "180px", maxHeight: "120px", objectFit: "cover" }}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="col-12 mt-2">
                    <button type="submit" className="theme-btn" disabled={updateMutation.isPending}>
                      {updateMutation.isPending ? "Updating..." : "Update Section"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          );
        })}

        {showExtraPanel && (
          <div className="card-body border-top">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="mb-0">Extra Sections</h6>
              <button type="button" className="btn btn-success btn-sm" onClick={addExtraSection}>
                +
              </button>
            </div>

            {!allExtras.length && (
              <div className="text-muted mt-3">No extra sections added yet.</div>
            )}

            {allExtras.map((row, idx) => {
              const isDb = row._source === "db";
              const key = isDb ? `db-${row.id}` : row._tmpKey;
              const k = getExtraKey(row);

              const titleVal = getExtraValue(row, "title");
              const descVal = getExtraValue(row, "description");

              const preview = row._source === "db" ? extraPreviews[k] : row.preview;
              const imageName = row._source === "db" ? row.image : row.image;

              return (
                <div key={key} className="border rounded p-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="fw-semibold">Section #{idx + 1}</div>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      disabled={deleteMutation.isPending}
                      onClick={() => removeExtra(row)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label fw-semibold">Section Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={titleVal || ""}
                        onChange={(e) => handleExtraChange(row, idx, "title", e.target.value)}
                      />

                      <div className="mt-3">
                        <label className="form-label fw-semibold">Description</label>
                        <ReactQuill
                          theme="snow"
                          value={descVal || ""}
                          onChange={(val) => handleExtraChange(row, idx, "description", val)}
                          style={{ minHeight: "180px" }}
                        />
                      </div>

                      <div className="mt-3">
                        <button
                          type="button"
                          className="theme-btn"
                          disabled={
                            createMutation.isPending ||
                            updateExtraMutation.isPending ||
                            deleteMutation.isPending
                          }
                          onClick={() => saveExtra(row, idx)}
                        >
                          {createMutation.isPending || updateExtraMutation.isPending
                            ? "Saving..."
                            : "Save Section"}
                        </button>
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">Section Image</label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleExtraImagePick(row, idx, e.target.files?.[0])}
                      />

                      <div className="mt-3">
                        {!!(preview || imageName) && (
                          <img
                            src={preview ? preview : imageName ? `${imageUrl}${imageName}` : ""}
                            alt="Preview"
                            className="rounded border"
                            style={{
                              maxWidth: "180px",
                              maxHeight: "120px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageContent;
