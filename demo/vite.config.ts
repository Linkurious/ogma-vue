import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
// import { resolve } from "path";

export default defineConfig({
  root: "./demo",
  plugins: [vue()],
});
