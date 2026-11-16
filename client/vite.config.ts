import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    port: 5173,
    // Allow temporary public tunnels for sharing the dev site (Cloudflare quick tunnel / ngrok).
    allowedHosts: [".trycloudflare.com", ".ngrok-free.app", ".ngrok.app"],
    // Same-origin requests in dev, so the httpOnly auth cookie just works.
    proxy: { "/api": "http://localhost:5000" },
  },
});
