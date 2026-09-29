import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { closeOutline, logoReact } from "ionicons/icons";
import { AtlasStyles } from "../../atlas-styles";

export interface ReactAppCardWidgetProps {
  subtitle?: string;
  /** Provided by the host when the widget renders inside a modal. */
  close?: () => void;
}

export default function ReactAppCardWidget({
  subtitle,
  close,
}: ReactAppCardWidgetProps) {
  return (
    <div className="p-4">
      <AtlasStyles />
      <IonCard className="m-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <IonCardHeader className="flex flex-row items-start gap-4 px-5 pt-5 pb-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <IonIcon icon={logoReact} className="text-3xl" />
          </div>
          <div className="min-w-0 flex-1">
            <IonCardSubtitle className="text-xs font-semibold tracking-widest text-sky-600 uppercase">
              React widget
            </IonCardSubtitle>
            <IonCardTitle className="mt-1 text-xl font-bold text-slate-900">
              React App Card
            </IonCardTitle>
          </div>
          {close && (
            <IonButton
              fill="clear"
              color="medium"
              shape="round"
              size="small"
              aria-label="Close"
              className="m-0"
              onClick={() => close()}
            >
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          )}
        </IonCardHeader>
        <div className="px-5 pt-1 pb-5">
          {subtitle && (
            <p className="text-sm leading-relaxed text-slate-600">{subtitle}</p>
          )}
          {close && (
            <IonButton
              expand="block"
              className="m-0 mt-5"
              onClick={() => close()}
            >
              Close
            </IonButton>
          )}
        </div>
      </IonCard>
    </div>
  );
}
