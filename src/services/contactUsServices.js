import { baseUrl } from "./baseUrl";

export const saveContactReqest = async (data) => {

    let response = await fetch(`${baseUrl}contact-request`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    response = await response.json();

    return response;
}