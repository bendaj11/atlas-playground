import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { defineApp } from "@atlas/sdk/react";
import { App } from "./App";

export default defineApp({
  createRoot,
  createElement: () => createElement(App, { name: "React App" }),
});
