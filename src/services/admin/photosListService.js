import { baseUrl } from "@/services/baseUrl";
import buildHeaders from '@/helper/buildHeaders';
import handleResponse from '@/helper/handleResponse';
import convertToFormData from "@/helper/convertToFormData";


export const submitPhotosList = async (data) => {
    const formData = convertToFormData(data);

    const res = await fetch(`${baseUrl}photos-list`, {
        method: "POST",
        headers: buildHeaders(false),
        body: formData,
    });

    return handleResponse(res);
};


export const getPhotosListById = async (id, options = {}) => {

    if (!id) throw new Error("Photo Gallery id is required");

    const res = await fetch(`${baseUrl}photos-list?photo_gallery_id=${id}`, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};


export const deletePhotosList = async (id, options = {}) => {
    if (!id) throw new Error("Photo Gallery id is required");
    const { token } = options;

    const res = await fetch(`${baseUrl}photos-list/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};