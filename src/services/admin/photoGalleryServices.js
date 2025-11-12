import { baseUrl } from "@/services/baseUrl";
import buildHeaders from '@/helper/buildHeaders';
import handleResponse from '@/helper/handleResponse';
import convertToFormData from "@/helper/convertToFormData";


export const submitPhotoGallery = async (data) => {
    const formData = convertToFormData(data);

    const res = await fetch(`${baseUrl}photo-gallery`, {
        method: "POST",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


export const updatePhotoGallery = async (id, data) => {
    if (!id) throw new Error("Photo Gallery id is required for update");
    const formData = convertToFormData(data);

    const res = await fetch(`${baseUrl}photo-gallery/${id}`, {
        method: "PUT",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


export const getPhotoGallery = async (params = {}) => {
    const query = new URLSearchParams();

    Object.keys(params).forEach((k) => {
        if (params[k] !== undefined && params[k] !== null) {
            query.append(k, params[k]);
        }
    });

    const url = query.toString() ? `${baseUrl}photo-gallery?${query.toString()}` : `${baseUrl}photo-gallery`;

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const getPhotoGalleryById = async (id, options = {}) => {

    if (!id) throw new Error("Photo Gallery id is required");

    const res = await fetch(`${baseUrl}photo-gallery/${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const deletePhotoGallery = async (id, options = {}) => {
    if (!id) throw new Error("Photo Gallery id is required");

    const res = await fetch(`${baseUrl}photo-gallery/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};