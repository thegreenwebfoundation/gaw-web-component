import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: ".",
    emitAssets: true,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "GawInfoBar",
      fileName: "gaw-info-bar",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["lit"],
      output: {
        globals: {
          lit: "Lit",
        },
        exports: "named",
      },
    },
  },
});
