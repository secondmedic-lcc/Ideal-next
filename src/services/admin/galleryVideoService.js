// services/GalleryVideoService.js
import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";


const ENDPOINT = `${baseUrl}gallery-video`;

export const createGalleryVideo = async (data) => {

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



export const getGalleryVideos = async () => {

    const url = ENDPOINT;

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};



export const deleteGalleryVideo = async (id) => {
    if (!id) throw new Error("Gallery Video id is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};
