"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import Select from "react-select";
import swal from "sweetalert";
import { getFaqs as getCLasses } from "@/services/admin/classServices";
import { getFaqById, updateFaqs } from "@/services/admin/divisionServices";
import {
  FiHelpCircle,
  FiMessageSquare,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { selectStyles } from "../add/page";

const EditFaq = () => {
  const params = useParams();
  const router = useRouter();
  const faqId = params?.faq_id;

  const { register, handleSubmit, reset, formState, control } = useForm({
    defaultValues: {
      title: "",
      classes: "",
    },
  });
  const { data: classesData } = useQuery({
    queryKey: ["class"],
    queryFn: () => getCLasses(),
  });
  const classOptions = classesData?.data?.list?.map(item => ({
    value: item?.title,
    label: item?.title,
  }));

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    if (!faqId) return;

    let mounted = true;

    const load = async () => {
      try {
        setFetching(true);

        const res = await getFaqById(faqId);
        const faq = res?.data ?? res;

        if (!faq || (faq?.status !== undefined && faq.status === 0)) {
          if (mounted) {
            swal("Not Found", "FAQ not found or inactive.", "error");
          }
          return;
        }

        setSelectedClasses(JSON.parse(faq?.class_list));

        if (mounted) {
          reset({
            title: faq?.title ?? "",
            classes: faq?.class_list ?? "",
          });
        }
      } catch (err) {
        swal("Error", err?.message || "Failed to load FAQ details.", "error");
      } finally {
        if (mounted) setFetching(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [faqId, reset]);

  const onSubmit = async (values) => {
    if (!faqId) {
      return swal("Invalid ID", "FAQ ID is missing or invalid.", "error");
    }

    try {
      setLoading(true);

      const payload = {
        title: values.title,
        classes: values.classes
      };

      const res = await updateFaqs(faqId, payload);

      swal(
        "Success",
        res?.message || "Data updated successfully.",
        "success"
      ).then(() => {
        router.push("/admin/division");
      });
    } catch (err) {
      swal("Update Failed", err?.message || "Failed to update data.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiHelpCircle size={18} />
            <h5 className="admin-card-title">Edit Division</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {fetching ? (
            <div className="admin-loading">Loading details…</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <div className="row">
                {/* FAQ Title */}
                <div className="col-md-12 mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <FiHelpCircle />
                    Division
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formState.errors.title ? "is-invalid" : ""
                    }`}
                    {...register("title", { required: true })}
                  />
                  {formState.errors.title && (
                    <div className="invalid-feedback">Division is required</div>
                  )}
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
                        defaultValue={classOptions?.filter(opt =>
                          selectedClasses?.includes(opt.value)
                        )}
                        onChange={(val) => field.onChange(val.map(v => v.value))}
                      />
                    )}
                  />
                </div>

              </div>

              {/* Actions */}
              <div className="admin-form-actions">
                <button
                  type="submit"
                  className="theme-btn"
                  disabled={loading}
                >
                  <FiSave />
                  {loading ? "Updating..." : "Update"}
                </button>

                <button
                  type="button"
                  className="theme-btn btn-warn"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  <FiArrowLeft />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditFaq;
