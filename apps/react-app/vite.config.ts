import { createReactAppViteConfig } from "@atlas/sdk/federation-config";
import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(
  mergeConfig(
    createReactAppViteConfig({
      projectRoot: __dirname,
      projectName: "react-app",
      reactMajor: 19,
    }),
    {
      base: "./",
      plugins: [react({})],
      server: { port: 4202, cors: true },
    },
  ),
);
