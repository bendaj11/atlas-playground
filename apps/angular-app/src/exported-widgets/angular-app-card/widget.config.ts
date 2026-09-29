import type { ApplicationConfig } from "@angular/core";
import { provideIonicAngular } from "@ionic/angular/standalone";

export const widgetConfig: ApplicationConfig = {
  providers: [provideIonicAngular({ useSetInputAPI: true })],
};
