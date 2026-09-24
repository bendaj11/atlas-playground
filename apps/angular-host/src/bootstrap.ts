import { defineAngularHost } from "@atlas/runtime/angular";
import atlasConfig from "../atlas.config";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import {
  createCustomHostSdkOptions,
  type CustomerHostSdk,
} from "./app/host.config";

export const mount = defineAngularHost<CustomerHostSdk>({
  config: atlasConfig,
  component: AppComponent,
  appConfig,
  sdkOptions: createCustomHostSdkOptions,
});
