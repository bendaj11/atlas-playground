import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { setupIonicReact } from "@ionic/react";
import { defineApp } from "@atlas/sdk/react";
import { App } from "./App";

setupIonicReact();

export default defineApp({
  createRoot,
  createElement: () => createElement(App, { name: "React App" }),
});
