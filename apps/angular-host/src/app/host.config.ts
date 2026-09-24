import type { Injector } from "@angular/core";
import type { HostSdkOptions } from "@atlas/runtime/angular";
import type { CustomHostSdk, OpenModalOptions } from "@atlas/shared-types";
import { ModalController } from "@ionic/angular/standalone";
import { WidgetModalComponent } from "./widget-modal.component";

/** Add product-specific host SDK capabilities here. */
export type CustomerHostSdk = CustomHostSdk;

const MODAL_BREAKPOINTS = [0, 0.9];
const INITIAL_MODAL_BREAKPOINT = 0.9;

export function createCustomHostSdkOptions(
  injector: Injector,
): HostSdkOptions<CustomerHostSdk> {
  const modalController = injector.get(ModalController);

  return {
    openModal: async <TResult = void>(
      widgetId: string,
      options: OpenModalOptions,
    ) => {
      const modal = await modalController.create({
        ...options.modalOptions,
        breakpoints: MODAL_BREAKPOINTS,
        initialBreakpoint: INITIAL_MODAL_BREAKPOINT,
        component: WidgetModalComponent,
        componentProps: {
          widgetId,
          inputs: options.inputs ?? {},
        },
      });

      await modal.present();
      const { data } = await modal.onDidDismiss<TResult>();
      return data;
    },
  };
}
