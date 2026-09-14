import { createReactHostViteConfig } from "@atlas/sdk/federation-config";
import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(
  mergeConfig(
    createReactHostViteConfig({
      projectRoot: __dirname,
      projectName: "react-host",
    }),
    {
      base: "./",
      plugins: [react({})],
      server: { port: 4201, cors: true },
    },
  ),
);
