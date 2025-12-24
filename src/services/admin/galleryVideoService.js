import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";

const ENDPOINT = `${baseUrl}gallery-video`;

export const getGalleryVideos = async ({ video_category_id, page = 1, limit = 10 } = {}) => {
  const qs = new URLSearchParams();
  if (video_category_id) qs.set("video_category_id", String(video_category_id));
  qs.set("page", String(page));
  qs.set("limit", String(limit));

  const url = `${ENDPOINT}?${qs.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: buildHeaders(false),
    cache: "no-store", // 304 / cache issue avoid
  });

  return handleResponse(res);
};

export const saveGalleryVideo = async (payload) => {
  const res = await fetch(`${ENDPOINT}`, {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};