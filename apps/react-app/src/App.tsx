import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { arrowForwardOutline, albumsOutline } from "ionicons/icons";
import { useAtlasSdk } from "@atlas/sdk/react";
import type { CustomHostSdk } from "@atlas/shared-types";
import { ANGULAR_APP_CARD_WIDGET_ID, ANGULAR_APP_ID } from "./atlas-ids";
import { AtlasStyles } from "./atlas-styles";

interface AppProps {
  name?: string;
}

export function App({ name = "React App" }: AppProps) {
  const sdk = useAtlasSdk<CustomHostSdk>();

  return (
    <>
      <AtlasStyles />
      <main className="flex min-h-full items-start justify-center bg-slate-50 px-4 py-12">
        <IonCard className="m-0 w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="h-1.5 bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600" />
          <IonCardHeader className="px-6 pt-6 pb-2">
            <IonCardSubtitle className="text-xs font-semibold tracking-widest text-sky-600 uppercase">
              Atlas · React
            </IonCardSubtitle>
            <IonCardTitle className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {name}
            </IonCardTitle>
          </IonCardHeader>
          <div className="px-6 pt-2 pb-6">
            <p className="mb-6 text-base leading-relaxed text-slate-600">
              Jump over to the Angular App, or preview its card widget right
              here without leaving the page.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <IonButton
                className="m-0 flex-1"
                onClick={() => sdk.navigateTo(ANGULAR_APP_ID)}
              >
                Go to Angular App
                <IonIcon slot="end" icon={arrowForwardOutline} />
              </IonButton>
              <IonButton
                className="m-0 flex-1"
                fill="outline"
                onClick={() =>
                  void sdk.openModal(ANGULAR_APP_CARD_WIDGET_ID, {
                    inputs: { subtitle: `Opened from ${name}` },
                  })
                }
              >
                Open Angular widget
                <IonIcon slot="end" icon={albumsOutline} />
              </IonButton>
            </div>
          </div>
        </IonCard>
      </main>
    </>
  );
}
