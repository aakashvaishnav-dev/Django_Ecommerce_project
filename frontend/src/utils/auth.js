export const saveTokens = (tokens) => {
    if (!tokens) return;
    if (tokens.access) localStorage.setItem("access_token", tokens.access);
    if (tokens.refresh) localStorage.setItem("refresh_token", tokens.refresh);
};

export const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => {
    return localStorage.getItem("access_token");
};

export const authFetch = (url, options = {}) => {
    const token = getAccessToken();
    const headers = options.headers ? {...options.headers} : {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";

    return fetch(url, {
        ...options,
        headers,
    });
};