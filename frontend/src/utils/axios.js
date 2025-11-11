     import axios from "axios";

    // Simple axios instance configured for the project's API.
    // Uses Vite proxy by default (baseURL '/api/v1').
    const api = axios.create({
      baseURL: "/api/v1",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    // Minimal error handling: show friendly message for network errors,
    // and redirect to signin on 401 for non-auth endpoints.
    api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
          return Promise.reject({ ...err, message: "Cannot connect to server." });
        }

        const status = err.response?.status;
        const url = err.config?.url || "";

        // Redirect to signin for 401 on protected endpoints
        if (status === 401 && !url.includes("/auth/")) {
          if (window.location.pathname !== "/signin") {
            window.location.href = "/signin";
          }
        }

        return Promise.reject(err);
      }
    );

    export default api;

