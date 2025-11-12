import { baseUrl } from "@/services/baseUrl";
import buildHeaders from '@/helper/buildHeaders';
import handleResponse from '@/helper/handleResponse';
import convertToFormData from "@/helper/convertToFormData";

const ENDPOINT = `${baseUrl}brands`;

export const submitBrand = async (data, options = {}) => {
    const formData = convertToFormData(data);

    const res = await fetch(`${ENDPOINT}`, {
        method: "POST",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


export const updateBrand = async (id, data) => {
    if (!id) throw new Error("Brand id is required for update");
    const formData = convertToFormData(data);

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "PUT",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


export const getBrands = async (params = {}, options = {}) => {
    const query = new URLSearchParams();

    Object.keys(params).forEach((k) => {
        if (params[k] !== undefined && params[k] !== null) {
            query.append(k, params[k]);
        }
    });

    const url = query.toString() ? `${ENDPOINT}?${query.toString()}` : `${ENDPOINT}`;

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const getBrandById = async (id, options = {}) => {
 
    if (!id) throw new Error("Brand id is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    console.log(res);

    return handleResponse(res);
};

export const deleteBrand = async (id, options = {}) => {
    if (!id) throw new Error("Brand id is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};