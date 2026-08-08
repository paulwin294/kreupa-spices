import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [tanstackStart({
    customViteReactPlugin: true,
  }), react(), tailwindcss(), cloudflare({
    viteEnvironment: {
      name: "ssr"
    }
  })],
  resolve: {
    tsconfigPaths: true,
  },
});