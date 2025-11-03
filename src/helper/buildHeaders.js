const buildHeaders = (isJson = false) => {

    const token = localStorage.getItem('token');

    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (isJson) headers["Content-Type"] = "application/json";
    return headers;
};

export default buildHeaders;