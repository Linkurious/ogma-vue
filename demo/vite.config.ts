import { defineConfig } from "vite";
// import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: './demo',
  plugins: [vue()],
});