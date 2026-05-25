export async function apiFetch(url, options = {}) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}${url}`,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers
            }
        }
    );

    // TOKEN INVALIDO
    if (response.status === 401 || response.status === 403) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        return;
    }

    return response;
}