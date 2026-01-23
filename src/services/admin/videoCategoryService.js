// src/services/admin/videoCategoryService.js

import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";

const ENDPOINT = `${baseUrl}video-category`;

export const saveVideoCategory = async (data) => {
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

export const getVideoCategories = async ({ page = 1, limit = 10 } = {}) => {
  const qs = new URLSearchParams();
  qs.set("page", String(page));
  qs.set("limit", String(limit));

  const url = `${ENDPOINT}?${qs.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: buildHeaders(false),
    cache: "no-store",
  });

  return handleResponse(res);
};

export const deleteVideoCategory = async (id) => {
  if (!id) throw new Error("Video Category id is required");

  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: buildHeaders(false),
  });

  return handleResponse(res);
};

export const updateVideoCategory = async (id, data) => {
  if (!id) throw new Error("Video Category id is required");

  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "PUT",
    headers: buildHeaders(true), // ✅ JSON + Authorization
    body: JSON.stringify(data),  // { title, slug?, status? }
  });

  return handleResponse(res);
};
