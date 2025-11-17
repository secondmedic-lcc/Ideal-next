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
        if (!branchRes || !branchRes.data) {
          console.error("Failed to fetch branch details", branchRes);
          return;
        }
        const b = branchRes.data;

        const branchStateId = b.state_id ? String(b.state_id) : "";
        const branchCityId = b.city_id ? String(b.city_id) : "";

        const countryRes = await getCountryList();
        if (countryRes?.status) {
          setCountries(countryRes.data.list || []);
        } else {
          setCountries([]);
        }

        const stateRes = await getStateListByCountry(101);
        if (stateRes?.status) setStates(stateRes.data.list || []);
        else setStates([]);

        if (branchStateId) {
          const cityRes = await getCityListByState(branchStateId);
          if (cityRes?.status) setCities(cityRes.data.list || []);
          else setCities([]);
        } else {
          setCities([]);
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
        console.error("Error loading edit page data:", err);
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

    try {
      const stateRes = await getStateListByCountry(countryId);
      if (stateRes?.status) setStates(stateRes.data.list || []);
    } catch (err) {
      console.error("Failed to load states:", err);
    }
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setCities([]);
    setValue("city_id", "");

    if (!stateId) return;

    try {
      const cityRes = await getCityListByState(stateId);
      if (cityRes?.status) setCities(cityRes.data.list || []);
    } catch (err) {
      console.error("Failed to load cities:", err);
    }
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
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-white p-3">
          <h5 className="mb-0">Edit Branch Locator</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Country */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Country</label>
                <select
                  className="form-control"
                  {...register("country_id", { required: true })}
                  onChange={(e) => {
                    // update form value and then handle loading
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
                <label className="form-label">State</label>
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
                <label className="form-label">City</label>
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
                <label className="form-label">Branch Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", { required: true })}
                />
              </div>

              {/* Contact */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("contact", { required: true })}
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email", { required: true })}
                />
              </div>

              {/* Address */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows={3}
                  {...register("address", { required: true })}
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Branch"}
              </button>

              <button type="button" className="btn btn-outline-secondary" onClick={() => router.back()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
