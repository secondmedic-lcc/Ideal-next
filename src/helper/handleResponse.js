const handleResponse = async (res) => {
    const json = await res.json().catch(() => {
        throw new Error("Invalid JSON response from server");
    });
    if (!res.ok) {
        const message = json?.message || json?.error || "Server error";
        throw new Error(message);
    }
    return json;
};

export default handleResponse;