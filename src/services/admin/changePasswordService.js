import { baseUrl } from "../baseUrl";

export const changePassword = async (payload) => {
  const response = await fetch(`${baseUrl}users/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust if needed
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to change password");
  }

  return data;
};