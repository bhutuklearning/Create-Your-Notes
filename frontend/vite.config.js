import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000, // Match backend CORS configuration
    proxy: {
      // Proxy API requests to backend
      // If you use this, you can change axios baseURL to '/api/v1'
      "/api": {
        target: "http://localhost:22000", // Backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
