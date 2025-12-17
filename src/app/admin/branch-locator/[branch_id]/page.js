"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  getBranchLocatorById,
  updateBranchLocator,
} from "@/services/admin/branchLocatorServices";
import swal from "sweetalert";

import {
  getCountryList,
  getStateListByCountry,
  getCityListByState,
} from "@/services/admin/listServices";

import {
  FiMapPin,
  FiGlobe,
  FiMap,
  FiHome,
  FiPhone,
  FiMail,
  FiSave,
  FiX,
} from "react-icons/fi";

export default function EditBranchLocator() {
  const { branch_id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedState = watch("state_id");

  useEffect(() => {
    if (!branch_id) return;

    (async () => {
      try {
        const branchRes = await getBranchLocatorById(branch_id);
        if (!branchRes?.data) return;

        const b = branchRes.data;

        const branchStateId = b.state_id ? String(b.state_id) : "";
        const branchCityId = b.city_id ? String(b.city_id) : "";

        const countryRes = await getCountryList();
        if (countryRes?.status) setCountries(countryRes.data.list || []);

        const stateRes = await getStateListByCountry(101);
        if (stateRes?.status) setStates(stateRes.data.list || []);

        if (branchStateId) {
          const cityRes = await getCityListByState(branchStateId);
          if (cityRes?.status) setCities(cityRes.data.list || []);
        }

        reset({
          country_id: 101,
          state_id: branchStateId,
          city_id: branchCityId,
          name: b.name ?? "",
          contact: b.contact ?? "",
          email: b.email ?? "",
          address: b.address ?? "",
        });
      } catch (err) {
        console.error("Error loading branch:", err);
      }
    })();
  }, [branch_id, reset]);

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setStates([]);
    setCities([]);
    setValue("state_id", "");
    setValue("city_id", "");

    if (!countryId) return;

    const stateRes = await getStateListByCountry(countryId);
    if (stateRes?.status) setStates(stateRes.data.list || []);
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setCities([]);
    setValue("city_id", "");

    if (!stateId) return;

    const cityRes = await getCityListByState(stateId);
    if (cityRes?.status) setCities(cityRes.data.list || []);
  };

  const onSubmit = async (data) => {
    try {
      const res = await updateBranchLocator(branch_id, data);
      if (res?.status) {
        swal("Success", "Branch updated successfully!", "success");
        router.push("/admin/branch-locator");
      } else {
        swal("Error", "Failed to update branch", "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      swal("Error", "An error occurred while updating branch", "error");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiMapPin size={18} />
            <h5 className="admin-card-title">Edit Branch Locator</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Country */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiGlobe />
                  Country
                </label>
                <select
                  className="form-control"
                  {...register("country_id", { required: true })}
                  onChange={(e) => {
                    setValue("country_id", e.target.value);
                    handleCountryChange(e);
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map((item) => (
                    <option key={item.id} value={String(item.id)}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiMap />
                  State
                </label>
                <select
                  className="form-control"
                  {...register("state_id", { required: true })}
                  onChange={(e) => {
                    setValue("state_id", e.target.value);
                    handleStateChange(e);
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((item) => (
                    <option key={item.id} value={String(item.id)}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiMapPin />
                  City
                </label>
                <select
                  className="form-control"
                  {...register("city_id", { required: true })}
                  disabled={!watchedState}
                >
                  <option value="">Select City</option>
                  {cities.map((item) => (
                    <option key={item.id} value={String(item.id)}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiHome />
                  Branch Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", { required: true })}
                />
              </div>

              {/* Contact */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiPhone />
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("contact", { required: true })}
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiMail />
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email", { required: true })}
                />
              </div>

              {/* Address */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <FiHome />
                  Address
                </label>
                <textarea
                  rows={3}
                  className="form-control"
                  {...register("address", { required: true })}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button
                type="submit"
                className="theme-btn"
                disabled={isSubmitting}
              >
                <FiSave />
                {isSubmitting ? "Updating..." : "Update Branch"}
              </button>

              <button
                type="button"
                className="theme-btn btn-warn"
                onClick={() => router.back()}
              >
                <FiX />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
