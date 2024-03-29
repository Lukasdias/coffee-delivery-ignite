import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), tsConfigPaths(), viteCompression()],
});
