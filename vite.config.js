import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import alias from "@rollup/plugin-alias";

const path = require("path");

const resolve = (alias, replaced) => ({
  find: alias,
  replacement: path.resolve(__dirname, replaced),
});

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    alias({
      entries: [
        resolve("@/assets", "src/assets"),
        resolve("@/configs", "src/modules/configs"),
        resolve("@/libs", "src/modules/libs"),
        resolve("@/pages", "src/modules/pages"),
        resolve("@/modules", "src/modules"),
        resolve("@/test", "src/test"),
        resolve("@/types", "src/types"),
        resolve("@/utils", "src/utils"),
        resolve("@", "src"),
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
