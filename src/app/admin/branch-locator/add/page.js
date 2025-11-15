"use client";

import React, { useEffect, useState } from "react";
import { useBranchLocator } from "@/hooks/admin/useBranchLocator";
import { getCountryList, getStateListByCountry, getCityListByState } from "@/services/admin/listServices";

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
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-white p-3">
                    <h5 className="mb-0">Create Branch Locator</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit((data) => mutate(data))}>
                        <div className="row">

                            {/* Country */}
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Country</label>
                                <select
                                    className="form-control"
                                    {...register("country_id", { required: true })}
                                    onChange={handleCountryChange}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* State */}
                            <div className="col-md-4 mb-3">
                                <label className="form-label">State</label>
                                <select
                                    className="form-control"
                                    {...register("state_id", { required: true })}
                                    onChange={handleStateChange}
                                    disabled={!selectedCountry}
                                >
                                    <option value="">Select State</option>
                                    {states.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* City */}
                            <div className="col-md-4 mb-3">
                                <label className="form-label">City</label>
                                <select
                                    className="form-control"
                                    {...register("city_id", { required: true })}
                                    disabled={!selectedState}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
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
                                ></textarea>
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={isPending}>
                                {isPending ? "Saving..." : "Save Branch"}
                            </button>
                            <button type="reset" className="btn btn-outline-secondary">
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
