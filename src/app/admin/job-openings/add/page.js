"use client";

import React from "react";
import { useJobOpeningHooks } from "@/hooks/admin/useJobOpeninHooks";
import {
  FiBriefcase,
  FiMail,
  FiFileText,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";

const AddJobOpening = () => {
  const { handleSubmit, mutate, register } = useJobOpeningHooks();

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiBriefcase size={18} />
            <h5 className="admin-card-title">Add Job Opening</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit(mutate)} method="POST">
            <div className="row">
              {/* Job Title */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiBriefcase />
                  Job Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter job title"
                  {...register("title")}
                />
              </div>

              {/* Apply Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiMail />
                  Apply Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter apply email"
                  {...register("apply_mail")}
                />
              </div>

              {/* Description */}
              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiFileText />
                  Job Description
                </label>
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Enter job description"
                  {...register("description")}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button type="submit" className="theme-btn">
                <FiSave />
                Save Job
              </button>

              <button type="reset" className="theme-btn btn-danger">
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

export default AddJobOpening;
