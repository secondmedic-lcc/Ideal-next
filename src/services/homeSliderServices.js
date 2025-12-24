import { baseUrl } from "./baseUrl";
import handleResponse from "@/helper/handleResponse";

const SLIDER_ENDPOINT = `${baseUrl}home-slider`;

export const getHomeSlider = async () => {
  const res = await fetch(`${SLIDER_ENDPOINT}?status=0`, {
    method: "GET",
  });

  return handleResponse(res);
};
