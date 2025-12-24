"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeoMeta } from "@/services/admin/pageContentServices.js";

export default function SeoMetaEditModal({ data, onClose }) {
  const qc = useQueryClient();

  const [form, setForm] = useState({
    page_name: data.page_name,
    meta_title: data.meta_title || "",
    meta_description: data.meta_description || "",
    meta_keywords: data.meta_keywords || "",
  });

  const mutation = useMutation({
    mutationFn: updateSeoMeta,
    onSuccess: () => {
      qc.invalidateQueries(["seo-meta-list"]);
      onClose();
    },
  });

  const submit = () => mutation.mutate(form);

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit SEO Meta – {data.page_name}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="mb-2">
              <label className="form-label">Meta Title</label>
              <input
                className="form-control"
                value={form.meta_title}
                onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Meta Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={form.meta_description}
                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Meta Keywords</label>
              <textarea
                className="form-control"
                rows="2"
                value={form.meta_keywords}
                onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={submit} disabled={mutation.isPending}>
              {mutation.isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
