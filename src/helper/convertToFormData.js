const convertToFormData = (data) => {
    if (data instanceof FormData) return data;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value === undefined || value === null) return;
        if (value instanceof File) {
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((v) => formData.append(`${key}[]`, v));
        } else {
            formData.append(key, value);
        }
    });
    return formData;
};

export default convertToFormData;