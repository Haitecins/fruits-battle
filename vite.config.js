import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import alias from "@rollup/plugin-alias";
const path = require("path");

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    alias({
      entries: [
        {
          find: "@/assets",
          replacement: path.resolve(__dirname, "src/assets"),
        },
        {
          find: "@/modules",
          replacement: path.resolve(__dirname, "src/modules"),
        },
        {
          find: "@/data",
          replacement: path.resolve(__dirname, "src/modules/data"),
        },
        {
          find: "@/libs",
          replacement: path.resolve(__dirname, "src/modules/libs"),
        },
        {
          find: "@/pages",
          replacement: path.resolve(__dirname, "src/modules/pages"),
        },
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    }),
  ],
  server: {
    port: 8080,
  },
  build: {
    outDir: "out",
    assetsDir: "static",
  },
});
