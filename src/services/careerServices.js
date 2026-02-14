import { baseUrl } from "./baseUrl";
import handleResponse from "@/helper/handleResponse";

const ENDPOINT = `${baseUrl}apply-job`;

export const submitApplyJobRequest = async (data) => {
  const formData = new FormData();

  formData.append("category", data.category);
  formData.append("email", data.email);
  formData.append("contact", data.contact);

  // Teaching
  if (data.category === "teaching") {
    formData.append("section", data.section || "");
    formData.append("subject", data.subject || "");
  }

  // Non-Teaching
  if (data.category === "non-teaching") {
    formData.append("job_id", data.job_id || "");
  }

  if (data.resume?.[0]) {
    formData.append("resume", data.resume[0]);
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response);
};

export const getAppliedJobRequest = async ({ page = 1 }) => {
    const token = localStorage.getItem("token");
  const res = await fetch(`${ENDPOINT}?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
};
