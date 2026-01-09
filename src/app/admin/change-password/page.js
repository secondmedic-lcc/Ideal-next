"use client";

import React, { useEffect } from "react";
import { FiLock, FiSave } from "react-icons/fi";
import swal from "sweetalert";
import { useChangePassword } from "@/hooks/admin/useChangePassword";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    mutate,
    isPending,
    errors,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useChangePassword();

  const newPassword = watch("newPassword");

  useEffect(() => {
    if (isSuccess) {
        swal({
        title: "Success",
        text: data?.message || "Password changed successfully",
        icon: "success",
        }).then(() => {
        reset();
        });
    }

    if (isError) {
        swal({
        title: "Error",
        text: error?.message || "Failed to change password",
        icon: "error",
        });
    }
    }, [isSuccess, isError]);

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiLock size={18} />
            <h5 className="admin-card-title">Change Password</h5>
          </div>
        </div>

        <div className="admin-card-body">
          <form
            onSubmit={handleSubmit((data) =>
              mutate({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
              })
            )}
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("oldPassword", {
                    required: "Old password required",
                  })}
                />
                {errors.oldPassword && (
                  <small className="text-danger">
                    {errors.oldPassword.message}
                  </small>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("newPassword", {
                    required: "New password required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />
                {errors.newPassword && (
                  <small className="text-danger">
                    {errors.newPassword.message}
                  </small>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword.message}
                  </small>
                )}
              </div>
            </div>

            <div className="admin-form-actions">
              <button
                type="submit"
                className="theme-btn"
                disabled={isPending}
              >
                <FiSave />
                {isPending ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
