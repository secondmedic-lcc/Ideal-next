"use client";

import React, { useEffect, useState } from "react";
import { useBranchLocator } from "@/hooks/admin/useBranchLocator";
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
  FiRefreshCw,
} from "react-icons/fi";

export default function AddBranchLocator() {
  const { handleSubmit, register, mutate, isPending } = useBranchLocator();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    getCountryList().then((res) => {
      if (res?.status) setCountries(res.data?.list);
    });
  }, []);

  // Load states when country changes
  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedState("");
    setStates([]);
    setCities([]);

    if (!countryId) return;

    const res = await getStateListByCountry(countryId);
    if (res?.status) setStates(res.data?.list);
  };

  // Load cities when state changes
  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setCities([]);

    if (!stateId) return;

    const res = await getCityListByState(stateId);
    if (res?.status) setCities(res.data?.list);
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-card-header">
          <div className="admin-card-title-wrap">
            <FiMapPin size={18} />
            <h5 className="admin-card-title">Add Branch Locator</h5>
          </div>
        </div>

        {/* Body */}
        <div className="admin-card-body">
          <form onSubmit={handleSubmit((data) => mutate(data))}>
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
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((item) => (
                    <option key={item.id} value={item.id}>
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
                  onChange={handleStateChange}
                  disabled={!selectedCountry}
                >
                  <option value="">Select State</option>
                  {states.map((item) => (
                    <option key={item.id} value={item.id}>
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
                  disabled={!selectedState}
                >
                  <option value="">Select City</option>
                  {cities.map((item) => (
                    <option key={item.id} value={item.id}>
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
                  placeholder="Enter branch name"
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
                  placeholder="Enter contact number"
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
                  placeholder="Enter email address"
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
                  placeholder="Enter branch address"
                  {...register("address", { required: true })}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button type="submit" className="theme-btn" disabled={isPending}>
                <FiSave />
                {isPending ? "Saving..." : "Save Branch"}
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
}
