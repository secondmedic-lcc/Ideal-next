// services/PageContentService.js
import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";
import convertToFormData from "@/helper/convertToFormData";

const ENDPOINT = `${baseUrl}page-content`;

export const createPageContent = async (data) => {

    const token = localStorage.getItem('token');

    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    response = await response.json();

    return response;
};


export const updatePageContent = async (id, data = {}, options = {}) => {
    if (!id) throw new Error("Page Content id is required for update");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "PUT",
        headers: buildHeaders(true),
        body: JSON.stringify(data),
    });

    return handleResponse(res);
};


export const getPageContents = async (params = {}, options = {}) => {
    const query = new URLSearchParams();
    Object.keys(params).forEach((k) => {
        if (params[k] !== undefined && params[k] !== null && params[k] !== "") {
            query.append(k, params[k]);
        }
    });

    const url = query.toString() ? `${ENDPOINT}?${query.toString()}` : ENDPOINT;

    console.log(url);

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const getPageContentById = async (id, options = {}) => {
    if (!id) throw new Error("Page Content id is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const deletePageContent = async (id, options = {}) => {
    if (!id) throw new Error("Page Content id is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};
