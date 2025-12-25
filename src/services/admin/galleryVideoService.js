// src/services/admin/galleryVideoService.js

import { baseUrl } from "@/services/baseUrl";
import buildHeaders from "@/helper/buildHeaders";
import handleResponse from "@/helper/handleResponse";

const GALLERY_VIDEO_ENDPOINT = `${baseUrl}gallery-video`;
const VIDEO_CATEGORY_ENDPOINT = `${baseUrl}video-category`;

/**
 * ✅ Video Category List
 * GET /video-category?status=1
 */
export const getVideoCategories = async ({ status = 1 } = {}) => {
  const qs = new URLSearchParams();
  if (status !== undefined && status !== null) qs.append("status", String(status));

  const res = await fetch(
    `${VIDEO_CATEGORY_ENDPOINT}${qs.toString() ? `?${qs.toString()}` : ""}`,
    {
      method: "GET",
      headers: buildHeaders(false),
    }
  );

  return handleResponse(res);
};

/**
 * ✅ Gallery Video List (Admin / Frontend both)
 * GET /gallery-video?page=1&limit=10&video_category_id=2
 */
export const getGalleryVideos = async (
  { video_category_id, page = 1, limit = 10, status = 1 } = {}
) => {
  const qs = new URLSearchParams();
  if (page) qs.append("page", String(page));
  if (limit) qs.append("limit", String(limit));
  if (video_category_id !== undefined && video_category_id !== null && video_category_id !== "")
    qs.append("video_category_id", String(video_category_id));
  if (status !== undefined && status !== null) qs.append("status", String(status));

  const res = await fetch(`${GALLERY_VIDEO_ENDPOINT}?${qs.toString()}`, {
    method: "GET",
    headers: buildHeaders(false),
  });

  return handleResponse(res);
};

/**
 * ✅ Gallery Video List by Category Slug (Frontend route)
 * Example:
 * GET /gallery-video/by-category-slug/offline-video?page=1&limit=9 
 */
export const getGalleryVideosByCategorySlug = async (
  { slug, page = 1, limit = 9, status = 1 } = {}
) => {
  if (!slug) throw new Error("Category slug is required");

  const qs = new URLSearchParams();
  if (page) qs.append("page", String(page));
  if (limit) qs.append("limit", String(limit));
  if (status !== undefined && status !== null) qs.append("status", String(status));

  const res = await fetch(
    `${GALLERY_VIDEO_ENDPOINT}/by-category-slug/${encodeURIComponent(slug)}?${qs.toString()}`,
    {
      method: "GET",
      headers: buildHeaders(false),
    }
  );

  return handleResponse(res);
};

/**
 * ✅ Add Gallery Video (Admin)
 * POST /gallery-video
 * payload: { title, link, video_category_id }
 */
export const saveGalleryVideo = async (payload = {}) => {
  const res = await fetch(`${GALLERY_VIDEO_ENDPOINT}`, {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/**
 * ✅ Update Gallery Video (Admin)
 * PUT /gallery-video/:id
 * payload: { title, link, video_category_id, status }
 */
export const updateGalleryVideo = async (id, payload = {}) => {
  if (!id) throw new Error("Video id is required for update");

  const res = await fetch(`${GALLERY_VIDEO_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/**
 * ✅ Delete Gallery Video (Admin)
 * DELETE /gallery-video/:id
 */
export const deleteGalleryVideo = async (id) => {
  if (!id) throw new Error("Video id is required for delete");

  const res = await fetch(`${GALLERY_VIDEO_ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: buildHeaders(false),
  });

  return handleResponse(res);
};

/**
 * ✅ Update Status (Admin) - optional
 * PATCH /gallery-video/:id/status
 * payload: { status: 0/1 }
 *
 * 
 */
export const updateGalleryVideoStatus = async (id, status = 1) => {
  if (!id) throw new Error("Video id is required for status update");

  const res = await fetch(`${GALLERY_VIDEO_ENDPOINT}/${id}/status`, {
    method: "PATCH",
    headers: buildHeaders(true),
    body: JSON.stringify({ status: Number(status) }),
  });

  return handleResponse(res);
};
