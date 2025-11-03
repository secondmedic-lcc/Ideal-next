// services/courseSectionService.js
import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";
import convertToFormData from "@/helper/convertToFormData";

const ENDPOINT = `${baseUrl}course-sections`;

/**
 * createCourseSection (CREATE)
 * data: plain object (no file expected for sections) or FormData
 * options: { token } optional
 */
export const createCourseSection = async (data) => {

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

/**
 * updateCourseSection (UPDATE)
 * id: section id
 * data: plain object
 * options: { token } optional
 */
export const updateCourseSection = async (id, data = {}, options = {}) => {
    if (!id) throw new Error("Section id is required for update");

    // backend expects JSON for updates; send JSON if no files
    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "PUT",
        headers: buildHeaders(true), // set Content-Type: application/json
        body: JSON.stringify(data),
    });

    return handleResponse(res);
};

/**
 * getCourseSections (LIST / PAGINATED)
 * params: { page, limit, course_id, status, ... }
 * options: { token } optional
 */
export const getCourseSections = async (params = {}, options = {}) => {
    const query = new URLSearchParams();
    Object.keys(params).forEach((k) => {
        if (params[k] !== undefined && params[k] !== null && params[k] !== "") {
            query.append(k, params[k]);
        }
    });

    const url = query.toString() ? `${ENDPOINT}?${query.toString()}` : ENDPOINT;

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};

/**
 * getCourseSectionById (READ single)
 */
export const getCourseSectionById = async (id, options = {}) => {
    if (!id) throw new Error("Section id is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};

/**
 * deleteCourseSection (SOFT DELETE)
 */
export const deleteCourseSection = async (id, options = {}) => {
    if (!id) throw new Error("Section id is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};
