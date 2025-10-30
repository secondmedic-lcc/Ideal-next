import { baseUrl } from "./baseUrl";

export const submitAdmissionRequest = async (data) => {

    let response = await fetch(`${baseUrl}admission-enquire`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    response = await response.json();

    return response;
};