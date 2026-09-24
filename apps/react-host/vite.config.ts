import { createReactHostViteConfig } from "@atlas/sdk/federation-config";
import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(
  mergeConfig(
    createReactHostViteConfig({
      projectRoot: __dirname,
      projectName: "react-host",
      // Add app-local workspace packages here so Vite bundles and serves them locally.
      skip: [],
    }),
    {
      base: "./",
      plugins: [react({}), tailwindcss()],
      server: { port: 4201, cors: true },
    },
  ),
);
