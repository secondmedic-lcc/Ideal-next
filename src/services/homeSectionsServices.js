import { baseUrl } from "./baseUrl";
import handleResponse from "@/helper/handleResponse";

const ENDPOINT_SECTION_1 = `${baseUrl}home/section-1`;
const ENDPOINT_SECTION_2 = `${baseUrl}home/section-2`;

export const getHomeSectionOne = async () => {
  const res = await fetch(ENDPOINT_SECTION_1, { method: "GET" });
  return handleResponse(res);
};

export const getHomeSectionTwo = async () => {
  const res = await fetch(ENDPOINT_SECTION_2, { method: "GET" });
  return handleResponse(res);
};