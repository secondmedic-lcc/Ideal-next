import { baseUrl } from "../baseUrl";
import handleResponse from "@/helper/handleResponse";

// ===== Slider =====
const SLIDER_ENDPOINT = `${baseUrl}custom-page-slider`;

// ===== Sections =====
const SECTION1_ENDPOINT = `${baseUrl}custom-page/section-1`;
const SECTION2_ENDPOINT = `${baseUrl}custom-page/section-2`;

export const listHomeSlider = async (custom_page_id=0) => {
  const res = await fetch(`${SLIDER_ENDPOINT}?custom_page_id=${custom_page_id}`, { method: "GET" });
  return handleResponse(res);
};

export const createHomeSlider = async (formData) => {
  const res = await fetch(SLIDER_ENDPOINT, {
    method: "POST",
    body: formData,
  });
  return handleResponse(res);
};

export const updateHomeSlider = async (id, formData) => {
  const res = await fetch(`${SLIDER_ENDPOINT}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return handleResponse(res);
};

export const deleteHomeSlider = async (id) => {
  const res = await fetch(`${SLIDER_ENDPOINT}/${id}`, { method: "DELETE" });
  return handleResponse(res);
};

// ===== Section 1 =====
export const getSection1 = async (page_id) => {
  const res = await fetch(`${SECTION1_ENDPOINT}?custom_page_id=${page_id}`, { method: "GET" });
  return handleResponse(res);
};

export const updateSection1 = async (id, formData) => {
  const res = await fetch(`${SECTION1_ENDPOINT}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return handleResponse(res);
};

// ===== Section 2 =====
export const getSection2 = async (page_id) => {
  const res = await fetch(`${SECTION2_ENDPOINT}?custom_page_id=${page_id}`, { method: "GET" });
  return handleResponse(res);
};

export const updateSection2 = async (id, formData) => {
  const res = await fetch(`${SECTION2_ENDPOINT}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return handleResponse(res);
};
