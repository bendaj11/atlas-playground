import { useMemo, useRef, type ComponentProps } from "react";
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
  onClose,
}: {
  request: WidgetModalRequest;
  onClose: () => void;
}) {
  const sdk = useAtlasSdk();
  const Widget = useMemo(
    () => sdk.getWidget<Record<string, unknown>>(request.widgetId),
    [sdk, request.widgetId],
  );

  return (
    <>
      <button
        className="atlas-widget-modal__close"
        type="button"
        onClick={onClose}
      >
        Close
      </button>
      <Widget {...(request.options.inputs ?? {})} />
    </>
  );
}

/** Renders the widget requested through `sdk.openModal` in an Ionic sheet modal. */
export function WidgetModal() {
  const request = useWidgetModalRequest();
  const { settle } = useWidgetModalControls();
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      {...(request?.options.modalOptions as Partial<IonModalProps>)}
      ref={modal}
      isOpen={request !== undefined}
      breakpoints={MODAL_BREAKPOINTS}
      initialBreakpoint={INITIAL_MODAL_BREAKPOINT}
      onDidDismiss={(event) => settle(event.detail.data)}
    >
      {request && (
        <WidgetModalContent
          request={request}
          onClose={() => void modal.current?.dismiss()}
        />
      )}
    </IonModal>
  );
}
