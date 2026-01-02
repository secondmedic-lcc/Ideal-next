"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import swal from "sweetalert";
import { getFaqById, updateFaqs } from "@/services/admin/classServices";
import {
  FiHelpCircle,
  FiMessageSquare,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";

const EditFaq = () => {
  const params = useParams();
  const router = useRouter();
  const faqId = params?.faq_id;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

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
            swal("Not Found", "Data not found or inactive.", "error");
          }
          return;
        }

        if (mounted) {
          reset({
            title: faq?.title ?? "",
          });
        }
      } catch (err) {
        swal("Error", err?.message || "Failed to load data details.", "error");
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
      return swal("Invalid ID", "ID is missing or invalid.", "error");
    }

    try {
      setLoading(true);

      const payload = {
        title: values.title,
      };

      const res = await updateFaqs(faqId, payload);

      swal(
        "Success",
        res?.message || "Data updated successfully.",
        "success"
      ).then(() => {
        router.push("/admin/class");
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
            <h5 className="admin-card-title">Edit Class</h5>
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
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formState.errors.title ? "is-invalid" : ""
                    }`}
                    {...register("title", { required: true })}
                  />
                  {formState.errors.title && (
                    <div className="invalid-feedback">Title is required</div>
                  )}
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
