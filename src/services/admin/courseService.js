import { baseUrl } from "@/services/baseUrl";
import buildHeaders from '@/helper/buildHeaders'


const handleResponse = async (res) => {
    const json = await res.json().catch(() => {
        throw new Error("Invalid JSON response from server");
    });
    if (!res.ok) {
        const message = json?.message || json?.error || "Server error";
        throw new Error(message);
    }
    return json;
};

/**
 * convertToFormData
 * Accepts either FormData or a plain object and returns FormData.
 * Files should be File objects (from <input type="file">).
 */
const convertToFormData = (data) => {
    if (data instanceof FormData) return data;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value === undefined || value === null) return;
        if (value instanceof File) {
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((v) => formData.append(`${key}[]`, v));
        } else {
            formData.append(key, value);
        }
    });
    return formData;
};

/**
 * submitCourse (CREATE)
 * data: FormData OR plain object (may include a File under `course_image`)
 * options: { token } optional
 */
export const submitCourse = async (data, options = {}) => {
    const { token } = options;
    const formData = convertToFormData(data);

    const res = await fetch(`${baseUrl}course`, {
        method: "POST",
        headers: buildHeaders(false), // do NOT set Content-Type
        body: formData,
    });

    return handleResponse(res);
};

/**
 * updateCourse (UPDATE)
 * id: course id
 * data: FormData OR plain object (if includes file, pass File under course_image)
 * options: { token } optional
 */
export const updateCourse = async (id, data) => {
    if (!id) throw new Error("Course id is required for update");
    const token = localStorage.getItem("token");
    const formData = convertToFormData(data);

    const res = await fetch(`${baseUrl}course/${id}`, {
        method: "PUT",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};

/**
 * getCourses (LIST / PAGINATED)
 * params: an object { page, limit, search, sort, ... } — will be converted to query string
 * options: { token } optional
 */
export const getCourses = async (params = {}, options = {}) => {
    const { token } = options;
    const query = new URLSearchParams();

    Object.keys(params).forEach((k) => {
        if (params[k] !== undefined && params[k] !== null) {
            query.append(k, params[k]);
        }
    });

    const url = query.toString() ? `${baseUrl}course?${query.toString()}` : `${baseUrl}course`;

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};

/**
 * getCourseById (READ single)
 * id: course id
 * options: { token } optional
 */
export const getCourseById = async (id, options = {}) => {
    if (!id) throw new Error("Course id is required");
    const { token } = options;

    const res = await fetch(`${baseUrl}course/${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};

/**
 * deleteCourse (DELETE)
 * id: course id
 * options: { token } optional
 */
export const deleteCourse = async (id, options = {}) => {
    if (!id) throw new Error("Course id is required");
    const { token } = options;

    const res = await fetch(`${baseUrl}course/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};