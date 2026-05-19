import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages deploys at https://<user>.github.io/<repo>/ — needs base path.
// Dev (`pnpm dev`) serves at root.
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  base: isProd ? "/kinari/" : "/",
  server: {
    port: 5180,
    host: "0.0.0.0",
    strictPort: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
