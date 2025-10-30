import { baseUrl } from "../baseUrl";

export const adminLogin = async (data) => {

    let response = await fetch(`${baseUrl}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    response = await response.json();

    console.log(response);

    return response;
};