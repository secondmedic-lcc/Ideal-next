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
    cache: "no-store",
  });

  return handleResponse(res);
};

export const saveGalleryVideo = async (payload) => {
  const res = await fetch(`${ENDPOINT}/add/category-video`, {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

export const deleteGalleryVideo = async (id) => {
  if (!id) throw new Error("Video id is required");

  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: buildHeaders(true),
  });

  return handleResponse(res);
};