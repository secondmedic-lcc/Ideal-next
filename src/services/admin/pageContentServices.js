// services/PageContentService.js
import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";
import convertToFormData from "@/helper/convertToFormData";

const ENDPOINT = `${baseUrl}page-content`;

export const createPageContent = async (data = {}) => {
    const formData = convertToFormData(data);

    const res = await fetch(`${ENDPOINT}`, {
        method: "POST",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


export const updatePageContent = async (id, data = {}, options = {}) => {
    if (!id) throw new Error("Page Content id is required for update");


    const formData = convertToFormData(data);
    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "PUT",
        headers: buildHeaders(false),
        body: formData,
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

export const uploadPageContentImage = async (file) => {
  const token = localStorage.getItem("token");

  const fd = new FormData();
  fd.append("file", file);

  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${baseUrl}upload`, {
    method: "POST",
    headers,
    body: fd,
  });

  return response.json();
};
