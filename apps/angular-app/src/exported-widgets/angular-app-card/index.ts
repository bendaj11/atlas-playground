import { Component, input } from "@angular/core";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { closeOutline, logoAngular } from "ionicons/icons";

@Component({
  selector: "atlas-angular-app-card-widget",
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
    <div class="p-4">
      <ion-card
        class="m-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md"
      >
        <ion-card-header class="flex flex-row items-start gap-4 px-5 pt-5 pb-3">
          <div
            class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600"
          >
            <ion-icon name="logo-angular" class="text-3xl" />
          </div>
          <div class="min-w-0 flex-1">
            <ion-card-subtitle
              class="text-xs font-semibold tracking-widest text-rose-600 uppercase"
            >
              Angular widget
            </ion-card-subtitle>
            <ion-card-title class="mt-1 text-xl font-bold text-slate-900">
              Angular App Card
            </ion-card-title>
          </div>
          @if (close(); as close) {
            <ion-button
              fill="clear"
              color="medium"
              shape="round"
              size="small"
              aria-label="Close"
              class="m-0"
              (click)="close()"
            >
              <ion-icon slot="icon-only" name="close-outline" />
            </ion-button>
          }
        </ion-card-header>
        <div class="px-5 pt-1 pb-5">
          @if (subtitle()) {
            <p class="text-sm leading-relaxed text-slate-600">
              {{ subtitle() }}
            </p>
          }
          @if (close(); as close) {
            <ion-button expand="block" class="m-0 mt-5" (click)="close()">
              Close
            </ion-button>
          }
        </div>
      </ion-card>
    </div>
  `,
})
export default class AngularAppCardWidget {
  readonly subtitle = input("Angular App Card");
  readonly close = input<() => void>();

  constructor() {
    addIcons({ closeOutline, logoAngular });
  }
}
