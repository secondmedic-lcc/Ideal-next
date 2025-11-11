import { baseUrl } from "@/services/baseUrl";
import buildHeaders from '@/helper/buildHeaders';
import handleResponse from '@/helper/handleResponse';
import convertToFormData from "@/helper/convertToFormData";


export const submitCourse = async (data, options = {}) => {
    const { token } = options;
    const formData = convertToFormData(data);

    const res = await fetch(`${baseUrl}course`, {
        method: "POST",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


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


export const getCourseById = async (id, options = {}) => {
 
    if (!id) throw new Error("Course id is required");

    const res = await fetch(`${baseUrl}course/${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};

export const deleteCourse = async (id, options = {}) => {
    if (!id) throw new Error("Course id is required");

    const res = await fetch(`${baseUrl}course/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};