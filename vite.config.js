import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import alias from "@rollup/plugin-alias";

const path = require("path");

const resolve = (alias, replaced) => ({
  find: alias,
  replacement: path.resolve(__dirname, replaced),
});

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        require("autoprefixer")({
          grid: true,
        }),
        require("postcss-flexbugs-fixes"),
      ],
    },
  },
  plugins: [
    legacy({
      // 自动获取.browserslistrc文件中的参数
      targets: "defaults",
    }),
    alias({
      entries: [
        resolve("@/assets", "src/assets"),
        resolve("@/configs", "src/modules/configs"),
        resolve("@/libs", "src/modules/libs"),
        resolve("@/pages", "src/modules/pages"),
        resolve("@/utils", "src/modules/utils"),
        resolve("@/modules", "src/modules"),
        resolve("@/test", "src/test"),
        resolve("@/types", "src/types"),
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
