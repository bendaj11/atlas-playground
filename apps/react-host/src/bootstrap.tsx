import "es-module-shims";
import { createRoot } from "react-dom/client";
import { setupIonicReact } from "@ionic/react";
import { defineReactHost } from "@atlas/runtime/react";
import atlasConfig from "../atlas.config";
import { HostLayout } from "./host-layout";
import {
  HostProviders,
  useCustomHostSdkOptions,
  type CustomerHostSdk,
} from "./host.config";
import "./tailwind.css";
import "./styles.css";

setupIonicReact();

export const mount = defineReactHost<CustomerHostSdk>({
  config: atlasConfig,
  layout: HostLayout,
  reactDom: { createRoot },
  providers: HostProviders,
  useSdkOptions: useCustomHostSdkOptions,
});
