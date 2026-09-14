import { Component, inject, Input, OnChanges } from "@angular/core";
import { injectAtlasSdk, WidgetOutlet } from "@atlas/sdk/angular";
import type { WidgetBinding } from "@atlas/sdk/angular";
import { ModalController } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  imports: [WidgetOutlet],
  template: `
    <button class="atlas-widget-modal__close" type="button" (click)="close()">
      Close
    </button>
    <div [atlasWidget]="widget"></div>
  `,
})
export class WidgetModalComponent implements OnChanges {
  @Input({ required: true }) widgetId!: string;
  @Input() inputs: Record<string, unknown> = {};

  protected widget!: WidgetBinding<Record<string, unknown>>;

  private readonly modalController = inject(ModalController);
  private readonly sdk = injectAtlasSdk();

  ngOnChanges(): void {
    this.widget = this.sdk.getWidget(this.widgetId, { inputs: this.inputs });
  }

  protected async close(): Promise<void> {
    await this.modalController.dismiss();
  }
}
