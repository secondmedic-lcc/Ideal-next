"use client";

import React from "react";
import { useFAQHooks } from "@/hooks/admin/useFAQHooks";
import {
  FiHelpCircle,
  FiMessageSquare,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";

const AddFAQs = () => {
  const { handleSubmit, mutate, register } = useFAQHooks();

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiHelpCircle size={18} />
            <h5 className="admin-card-title">Add FAQ</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit(mutate)} method="POST">
            <div className="row">
              {/* FAQ Title */}
              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiHelpCircle />
                  FAQ Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter FAQ question"
                  {...register("title")}
                />
              </div>

              {/* FAQ Description */}
              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiMessageSquare />
                  FAQ Answer
                </label>
                <textarea
                  rows={8}
                  className="form-control"
                  placeholder="Enter FAQ answer"
                  {...register("description")}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button type="submit" className="theme-btn">
                <FiSave />
                Add FAQ
              </button>

              <button
                type="reset"
                className="theme-btn btn-danger"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFAQs;
