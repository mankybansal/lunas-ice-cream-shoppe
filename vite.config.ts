import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }]
  },
  server: {
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: "build",
    assetsDir: "."
  },
  optimizeDeps: {
    exclude: ["react-hook-form"]
  }
});
