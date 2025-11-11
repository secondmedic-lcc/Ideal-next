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


export const getPhotosList = async (params = {}, options = {}) => {
    const { id, photo_slug, page = 1, limit = 10 } = params;

    const queryParams = new URLSearchParams();

    if (id) queryParams.append("photo_gallery_id", id);
    if (photo_slug) queryParams.append("slug", photo_slug);

    queryParams.append("page", page);
    queryParams.append("limit", limit);

    console.log(`${baseUrl}photos-list?${queryParams.toString()}`);

    const res = await fetch(`${baseUrl}photos-list?${queryParams.toString()}`, {
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