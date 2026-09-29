import { Component } from "@angular/core";
import { injectAppLoaded, injectAtlasSdk } from "@atlas/sdk/angular";
import type { CustomHostSdk } from "@atlas/shared-types";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { albumsOutline, arrowForwardOutline } from "ionicons/icons";
import { REACT_APP_CARD_WIDGET_ID, REACT_APP_ID } from "./atlas-ids";

@Component({
  selector: "atlas-angular-app-root",
  standalone: true,
  imports: [
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
  ],
  template: `
    <main
      class="flex min-h-full items-start justify-center bg-slate-50 px-4 py-12"
    >
      <ion-card
        class="m-0 w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
      >
        <div
          class="h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500"
        ></div>
        <ion-card-header class="px-6 pt-6 pb-2">
          <ion-card-subtitle
            class="text-xs font-semibold tracking-widest text-rose-600 uppercase"
          >
            Atlas · Angular
          </ion-card-subtitle>
          <ion-card-title
            class="mt-1 text-3xl font-bold tracking-tight text-slate-900"
          >
            Angular App
          </ion-card-title>
        </ion-card-header>
        <div class="px-6 pt-2 pb-6">
          <p class="mb-6 text-base leading-relaxed text-slate-600">
            Jump over to the React App, or preview its card widget right here
            without leaving the page.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <ion-button class="m-0 flex-1" (click)="goToReactApp()">
              Go to React App
              <ion-icon slot="end" name="arrow-forward-outline" />
            </ion-button>
            <ion-button
              class="m-0 flex-1"
              fill="outline"
              (click)="openReactWidget()"
            >
              Open React widget
              <ion-icon slot="end" name="albums-outline" />
            </ion-button>
          </div>
        </div>
      </ion-card>
    </main>
  `,
})
export class AppComponent {
  appLoaded = injectAppLoaded();
  private readonly sdk = injectAtlasSdk<CustomHostSdk>();

  constructor() {
    addIcons({ albumsOutline, arrowForwardOutline });
    setTimeout(() => this.appLoaded(), 50000);
  }

  protected goToReactApp(): void {
    this.sdk.navigateTo(REACT_APP_ID);
  }

  protected openReactWidget(): void {
    void this.sdk.openModal(REACT_APP_CARD_WIDGET_ID, {
      inputs: { subtitle: "Opened from Angular App" },
    });
  }
}
