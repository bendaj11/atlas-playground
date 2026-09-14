import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from "@angular/core";
import { AtlasAppContext, AtlasSdk } from "@atlas/sdk";
import {
  provideAtlasApp,
  type LocationStrategyAdapter,
} from "@atlas/sdk/angular";

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
    ],
  };
}
