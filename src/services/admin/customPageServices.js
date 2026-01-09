import { baseUrl } from "@/services/baseUrl";
import buildHeaders from '@/helper/buildHeaders';
import handleResponse from '@/helper/handleResponse';
import convertToFormData from "@/helper/convertToFormData";


export const submitPage = async (data) => {
    const formData = convertToFormData(data);

    const res = await fetch(`${baseUrl}custom_page`, {
        method: "POST",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


export const updatePhotoGallery = async (id, data) => {
    if (!id) throw new Error("id is required for update");
    const formData = convertToFormData(data);

    const res = await fetch(`${baseUrl}custom_page/${id}`, {
        method: "PUT",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


export const getPhotoGallery = async (slug = null) => {
    
    let url = `${baseUrl}custom_page`;

    if (slug != null) {
        url += '?page_slug='+slug;
    }

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const getPhotoGalleryById = async (id, options = {}) => {

    if (!id) throw new Error("Id is required");

    const res = await fetch(`${baseUrl}custom_page/${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const deletePhotoGallery = async (id, options = {}) => {
    if (!id) throw new Error("Id is required");

    const res = await fetch(`${baseUrl}custom_page/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};