"use client";

import React from "react";
import { useJobOpeningHooks } from "@/hooks/admin/useJobOpeninHooks";
import {
  FiBriefcase,
  FiMail,
  FiFileText,
  FiSave,
  FiRefreshCw,
  FiGrid,
} from "react-icons/fi";

const categoryOptions = [
  { id: 1, name: "Teaching" },
  { id: 2, name: "Non-Teaching" },
];

const AddJobOpening = () => {
  const { handleSubmit, mutate, register, setValue } = useJobOpeningHooks();

  const onCategoryChange = (e) => {
    const selectedId = Number(e.target.value || 0);
    const selected = categoryOptions.find((x) => x.id === selectedId);

    // ✅ backend fields
    setValue("category_id", selectedId);
    setValue("category_name", selected?.name ?? "");
  };

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
              {/* ✅ Category Dropdown */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiGrid />
                  Category
                </label>

                <select
                  className="form-select"
                  defaultValue=""
                  onChange={onCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

               
                <input type="hidden" {...register("category_id")} />
                <input type="hidden" {...register("category_name")} />
              </div>
              {/* Job Title */}
              <div className="col-md-4 mb-3">
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
              <div className="col-md-4 mb-3">
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
