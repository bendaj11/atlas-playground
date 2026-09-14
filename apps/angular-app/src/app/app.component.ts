import { Component } from "@angular/core";
import { CardComponent } from "@atlas/angular-ui";
import { injectAtlasSdk } from "@atlas/sdk/angular";
import { CustomHostSdk } from "@atlas/shared-types";

@Component({
  selector: "atlas-angular-app-root",
  standalone: true,
  imports: [CardComponent],
  template: `
    <ng-container>
      <ui-card
        title="Angular UI !TEST!"
        subtitle="Material card with Tailwind layout"
      />

      <div class="flex flex-col gap-3">
        <button
          (click)="
            sdk.openModal('9fdb722f-4b86-4c34-9ffa-b14963f85eaf', {
              inputs: { subtitle: 'Inject from angular app' },
            })
          "
        >
          Open react widget modal
        </button>
        <button
          (click)="sdk.navigateTo('85cdc884-3fda-46da-ac0b-73697f4a62c8')"
        >
          Go to react app
        </button>
      </div>
    </ng-container>
  `,
})
export class AppComponent {
  sdk = injectAtlasSdk<CustomHostSdk>();
}
