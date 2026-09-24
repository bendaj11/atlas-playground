import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideIonicAngular } from "@ionic/angular/standalone";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideIonicAngular({ useSetInputAPI: true }),
  ],
};
