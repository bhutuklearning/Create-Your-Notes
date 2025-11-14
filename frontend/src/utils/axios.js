     import axios from "axios";

    // Simple axios instance configured for the project's API.
    // Uses Vite proxy by default (baseURL '/api/v1').
    const api = axios.create({
      baseURL: "/api/v1",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    // Minimal error handling: show friendly message for network errors.
    // Note: 401 redirects are handled by ProtectedRoute component for smooth navigation.
    api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
          return Promise.reject({ ...err, message: "Cannot connect to server." });
        }

        // Don't redirect here - let ProtectedRoute handle it for smooth navigation
        // The ProtectedRoute component will handle 401 redirects using React Router

        return Promise.reject(err);
      }
    );

    export default api;

