import { baseUrl } from "../baseUrl";
import handleResponse from "@/helper/handleResponse";

// ===== Slider =====
const SLIDER_ENDPOINT = `${baseUrl}home-slider`;

// ===== Sections =====
const SECTION1_ENDPOINT = `${baseUrl}home/section-1`;
const SECTION2_ENDPOINT = `${baseUrl}home/section-2`;

export const listHomeSlider = async () => {
  const res = await fetch(SLIDER_ENDPOINT, { method: "GET" });
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
export const getSection1 = async () => {
  const res = await fetch(SECTION1_ENDPOINT, { method: "GET" });
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
export const getSection2 = async () => {
  const res = await fetch(SECTION2_ENDPOINT, { method: "GET" });
  return handleResponse(res);
};

export const updateSection2 = async (id, formData) => {
  const res = await fetch(`${SECTION2_ENDPOINT}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return handleResponse(res);
};
