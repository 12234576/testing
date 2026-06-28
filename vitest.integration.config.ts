import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/test/integration/**/*.{test,spec}.ts"],
    testTimeout: 30_000,
    hookTimeout: 30_000,
    env: {
      VITE_SUPABASE_URL:
        process.env.VITE_SUPABASE_URL ?? "https://zybkhhxvsdjkluqydcbb.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "",
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
