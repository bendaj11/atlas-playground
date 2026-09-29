import { useMemo, type ComponentProps, type RefObject } from "react";
import { IonModal } from "@ionic/react";
import { useAtlasSdk } from "@atlas/sdk/react";
import {
  useWidgetModalControls,
  useWidgetModalRequest,
  type WidgetModalRequest,
} from "./host.config";

const MODAL_BREAKPOINTS = [0, 0.9];
const INITIAL_MODAL_BREAKPOINT = 0.9;

type IonModalProps = ComponentProps<typeof IonModal>;

function WidgetModalContent({
  request,
  modalRef,
}: {
  request: WidgetModalRequest;
  modalRef: RefObject<HTMLIonModalElement | null>;
}) {
  const sdk = useAtlasSdk();
  const Widget = useMemo(
    () => sdk.getWidget<Record<string, unknown>>(request.widgetId),
    [sdk, request.widgetId],
  );
  // Widgets render their own close control and call the `close` input.
  // Dismiss through Ionic so the exit animation runs; onDidDismiss settles.
  const inputs = useMemo(
    () => ({
      ...request.options.inputs,
      close: (data?: unknown) => void modalRef.current?.dismiss(data),
    }),
    [request.options.inputs, modalRef],
  );

  return <Widget {...inputs} />;
}

/** Renders the widget requested through `sdk.openModal` in an Ionic sheet modal. */
export function WidgetModal() {
  const request = useWidgetModalRequest();
  const { settle, modalRef } = useWidgetModalControls();

  return (
    <IonModal
      {...(request?.options.modalOptions as Partial<IonModalProps>)}
      ref={modalRef}
      isOpen={request !== undefined}
      breakpoints={MODAL_BREAKPOINTS}
      initialBreakpoint={INITIAL_MODAL_BREAKPOINT}
      onDidDismiss={(event) => settle(event.detail.data)}
    >
      {request && <WidgetModalContent request={request} modalRef={modalRef} />}
    </IonModal>
  );
}
