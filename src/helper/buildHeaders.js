const buildHeaders = (isJson = false) => {
  let token = null;

  // ✅ only runs in browser
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const headers = {};

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (isJson) headers["Content-Type"] = "application/json";

  return headers;
};

export default buildHeaders;