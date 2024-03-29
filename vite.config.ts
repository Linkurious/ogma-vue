import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.{vue,ts}'],
      staticImport: true,
      outDir: 'dist/types',
      clearPureImport: false
    })
  ],
  build: {
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__dirname, "src/main.ts"),
      name: "Ogma-vue",
      // the name of the output files when the build is run
      fileName: "ogma-vue",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "@linkurious/ogma"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          "@linkurious/ogma": "Ogma",
        },
      },
    },
  },
});