import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { initFederation, loadRemoteModule } from "@atlas/sdk/federation";
import type { AtlasHostClientEntry } from "@atlas/sdk/lifecycle";
import {
  AtlasAngularHostAnchors,
  bootstrapAngularHost,
} from "@atlas/runtime/angular";
import atlasConfig from "../atlas.config";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { createCustomHostSdkOptions } from "./app/host.config";

type HostMountRequest = Parameters<AtlasHostClientEntry["mount"]>[0];

export async function bootstrap(request: HostMountRequest) {
  return bootstrapAngularHost({
    component: AppComponent,
    appConfig,
    request,
    createHostOptions: (injector) => ({
      router: injector.get(Router),
      location: injector.get(Location),
      anchors: injector.get(AtlasAngularHostAnchors),
      federation: { initFederation, loadRemoteModule },
      hostData: { hostId: atlasConfig.id, name: atlasConfig.name },
      ...createCustomHostSdkOptions(injector),
      runtimeConfig: request.runtimeConfig,
      ...(request.catalog ? { catalog: request.catalog } : {}),
    }),
  });
}

export const mount: AtlasHostClientEntry["mount"] = bootstrap;
