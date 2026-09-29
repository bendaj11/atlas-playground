import { Component, Input, OnChanges } from "@angular/core";
import { injectAtlasSdk, WidgetOutlet } from "@atlas/sdk/angular";
import type { WidgetBinding } from "@atlas/sdk/angular";

@Component({
  standalone: true,
  imports: [WidgetOutlet],
  // Widgets render their own close control through the `close` input.
  template: `<div [atlasWidget]="widget"></div>`,
})
export class WidgetModalComponent implements OnChanges {
  @Input({ required: true }) widgetId!: string;
  @Input() inputs: Record<string, unknown> = {};

  protected widget!: WidgetBinding<Record<string, unknown>>;

  private readonly sdk = injectAtlasSdk();

  ngOnChanges(): void {
    this.widget = this.sdk.getWidget(this.widgetId, { inputs: this.inputs });
  }
}
