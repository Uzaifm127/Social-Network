import { defineConfig } from "vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
});
