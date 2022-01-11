import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  server: {
    port: 8080,
  },
  build: {
    manifest: true,
    outDir: "out",
    assetsDir: "static",
    sourcemap: true,
  },
});
