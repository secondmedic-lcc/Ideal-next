"use client";

import React from "react";
import Select from "react-select";
import {
  FiHelpCircle,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";
import { Controller } from "react-hook-form";
import { useDivisionHooks } from "@/hooks/admin/useDivisionHooks";
import { getFaqs as getCLasses } from "@/services/admin/classServices";
import { useQuery } from "@tanstack/react-query";

// const classOptions = [
//    { value: "Class 1", label: "Class 1" },
//    { value: "Class 2", label: "Class 2" },
// ];

const AddFAQs = () => {
  const { handleSubmit, mutate, register, control } = useDivisionHooks();
  const { data: classesData } = useQuery({
    queryKey: ["class"],
    queryFn: () => getCLasses(),
  });

  const classOptions = classesData?.data?.list?.map(item => ({
    value: item?.title,
    label: item?.title,
  }));

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiHelpCircle size={18} />
            <h5 className="admin-card-title">Add Data</h5>
          </div>
        </div>

        <div className="admin-card-body">
          <form onSubmit={handleSubmit(mutate)}>
            <div className="row">

              {/* Division Title */}
              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold">
                  Division Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Division"
                  {...register("title")}
                />
              </div>

              {/* Multiple Class Select */}
              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold">
                  Select Classes
                </label>

                <Controller
                  name="classes"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti
                      isSearchable={true}
                      options={classOptions}
                      styles={selectStyles}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      placeholder="Select Classes"
                      onChange={(val) => field.onChange(val.map(v => v.value))}
                    />
                  )}
                />
              </div>

            </div>

            <div className="admin-form-actions">
              <button type="submit" className="theme-btn">
                <FiSave /> Add Data
              </button>

              <button type="reset" className="theme-btn btn-danger">
                <FiRefreshCw /> Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "8px",
    borderColor: state.isFocused ? "#0d6efd" : "#dee2e6",
    boxShadow: state.isFocused
      ? "0 0 0 0.2rem rgba(13,110,253,.25)"
      : "none",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "6px 12px",
    gap: "6px",
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),

  placeholder: (base) => ({
    ...base,
    // 👈 removes the empty blue box
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "#e7f1ff",
    borderRadius: "6px",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "#0d6efd",
    fontWeight: 500,
  }),

  multiValueRemove: (base) => ({
    ...base,
    ":hover": {
      backgroundColor: "#0d6efd",
      color: "#fff",
    },
  }),
};


export default AddFAQs;