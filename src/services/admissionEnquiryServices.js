import { baseUrl } from "./baseUrl";
import handleResponse from '@/helper/handleResponse';

const ENDPOINT = `${baseUrl}admission-enquire`;

export const submitAdmissionRequest = async (data) => {

    let response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    response = await response.json();

    return response;
};

export const getAdmissionRequest = async ({ page = 1 }) => {
    const res = await fetch(`${ENDPOINT}?page=${page}`, {
        method: "GET",
    });

    return handleResponse(res);
};