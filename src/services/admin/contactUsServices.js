// services/ContactRequestervice.js
import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";


const ENDPOINT = `${baseUrl}contact-request`;

export const getContactRequest = async () => {

    const token = localStorage.getItem('token');

    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const url = ENDPOINT;

    const res = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    return handleResponse(res);
};



export const deleteContactRequest = async (id) => {
    if (!id) throw new Error("Contact Request id is required");

    const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: buildHeaders(false),
    });

    return handleResponse(res);
};
