import { baseUrl } from "@/services/baseUrl";
import buildHeaders from '@/helper/buildHeaders';
import handleResponse from '@/helper/handleResponse';
import convertToFormData from "@/helper/convertToFormData";


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