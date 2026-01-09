"use client";

import React from "react";
import {
  FiHelpCircle,
  FiMessageSquare,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";
import { useClassHooks } from "@/hooks/admin/useClassHooks";

const AddFAQs = () => {
  const { handleSubmit, mutate, register } = useClassHooks();

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiHelpCircle size={18} />
            <h5 className="admin-card-title">Add Data</h5>
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
                  Class Name (Title)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Class Name e.g. Nursery, KG I, Class 3rd, Class 10th"
                  {...register("title")}
                />
              </div>

             
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button type="submit" className="theme-btn">
                <FiSave />
                Add Data
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
