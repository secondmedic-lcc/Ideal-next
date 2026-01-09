import { baseUrl } from "../baseUrl";
import handleResponse from "@/helper/handleResponse";

// ===== Slider =====
const SLIDER_ENDPOINT = `${baseUrl}custom-page/section-three`;

const SECTION3_ENDPOINT = `${baseUrl}custom-page/section-3`;

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

// ===== Section 3 =====
export const getSection3 = async (page_id) => {
  const res = await fetch(`${SECTION3_ENDPOINT}?custom_page_id=${page_id}`, { method: "GET" });
  return handleResponse(res);
};

export const updateSection3 = async (id, formData) => {
  const res = await fetch(`${SECTION3_ENDPOINT}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return handleResponse(res);
};
