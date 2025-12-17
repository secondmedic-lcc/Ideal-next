"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import swal from "sweetalert";
import {
  getJobOpeningById,
  updateJobOpening,
} from "@/services/admin/jobOpeningService";
import { FiBriefcase, FiMail, FiFileText, FiSave, FiX } from "react-icons/fi";

const EditJobOpening = () => {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.job_id;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      title: "",
      apply_mail: "",
      description: "",
      status: 1,
    },
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    let mounted = true;

    const load = async () => {
      try {
        setFetching(true);
        const res = await getJobOpeningById(jobId);
        const job = res?.data ?? res;

        if (!job || (job?.status !== undefined && job.status === 0)) {
          if (mounted) {
            swal("Not Found", "Job Opening not found or inactive.", "error");
          }
          return;
        }

        if (mounted) {
          reset({
            title: job?.title ?? "",
            apply_mail: job?.apply_mail ?? "",
            description: job?.description ?? "",
            status: typeof job?.status !== "undefined" ? Number(job.status) : 1,
          });
        }
      } catch (err) {
        swal("Error", err?.message ?? "Failed to load job details.", "error");
      } finally {
        if (mounted) setFetching(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [jobId, reset]);

  const onSubmit = async (values) => {
    if (!jobId) {
      return swal("Invalid ID", "Job ID is missing or invalid.", "error");
    }

    try {
      setLoading(true);

      const payload = {
        title: values.title,
        apply_mail: values.apply_mail,
        description: values.description,
      };

      const res = await updateJobOpening(jobId, payload);

      swal(
        "Success",
        res?.message || "Job Opening updated successfully.",
        "success"
      ).then(() => {
        router.push("/admin/job-openings");
      });
    } catch (err) {
      swal(
        "Update Failed",
        err?.message ?? "Failed to update Job Opening.",
        "error"
      );
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
            <FiBriefcase size={18} />
            <h5 className="admin-card-title">Edit Job Opening</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          {fetching ? (
            <div className="admin-empty">Loading job details…</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <div className="row">
                {/* Job Title */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold d-flex align-items-center gap-2">
                    <FiBriefcase />
                    Job Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formState.errors.title ? "is-invalid" : ""
                    }`}
                    {...register("title", { required: true })}
                  />
                  {formState.errors.title && (
                    <div className="invalid-feedback">
                      Job title is required
                    </div>
                  )}
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
                    rows={5}
                    className={`form-control ${
                      formState.errors.description ? "is-invalid" : ""
                    }`}
                    {...register("description", {
                      required: true,
                    })}
                  />
                  {formState.errors.description && (
                    <div className="invalid-feedback">
                      Job description is required
                    </div>
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
                  {loading ? "Updating..." : "Update Job"}
                </button>

                <button
                  type="button"
                  className="theme-btn btn-warn"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  <FiX />
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

export default EditJobOpening;
