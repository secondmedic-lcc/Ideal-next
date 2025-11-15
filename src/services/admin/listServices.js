// services/ListService.js
import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";

const ENDPOINT = `${baseUrl}`;

/**
 * Get all countries
 */
export const getCountryList = async () => {
    const res = await fetch(`${ENDPOINT}country`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};

/**
 * Get state list by country ID
 */
export const getStateListByCountry = async (countryId) => {
    if (!countryId) throw new Error("country_id is required");

    const res = await fetch(`${ENDPOINT}states/${countryId}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};

/**
 * Get city list by state ID
 */
export const getCityListByState = async (stateId) => {
    if (!stateId) throw new Error("state_id is required");

    const res = await fetch(`${ENDPOINT}city/${stateId}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};
