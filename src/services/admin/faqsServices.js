// services/FaqsService.js
import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";

const ENDPOINT = `${baseUrl}faqs`;


export const saveFaqs = async (data) => {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });

    response = await response.json();
    return response;
};


export const getFaqs = async () => {
    const url = ENDPOINT;

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const getFaqById = async (id) => {
    if (!id) throw new Error("FAQ ID is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const updateFaqs = async (id, data) => {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let response = await fetch(`${ENDPOINT}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
    });

    response = await response.json();
    return response;
};


export const deleteFaqs = async (id) => {
    if (!id) throw new Error("FAQ ID is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};
