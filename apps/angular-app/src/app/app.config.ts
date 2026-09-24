import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideAtlasApp } from "@atlas/sdk/angular";
import { provideIonicAngular } from "@ionic/angular/standalone";
import type { AtlasSdk } from "@atlas/sdk";
import type { AtlasAppContext } from "@atlas/sdk/lifecycle";

interface AtlasAppConfigOptions {
  context: AtlasAppContext;
  sdk: AtlasSdk;
  styleTarget: Node & ParentNode;
}

export function createAppConfig({
  context,
  sdk,
  styleTarget,
}: AtlasAppConfigOptions): ApplicationConfig {
  return {
    providers: [
      provideZonelessChangeDetection(),
      provideAtlasApp({ context, sdk, styleTarget }),
      provideIonicAngular({ useSetInputAPI: true }),
    ],
  };
}
