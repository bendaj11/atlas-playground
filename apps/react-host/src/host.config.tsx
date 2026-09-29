import {
  createContext,
  StrictMode,
  useContext,
  useMemo,
  useRef,
  useState,
  type RefObject,
  type ReactNode,
} from "react";
import type { HostSdkOptions } from "@atlas/runtime/react";
import type { CustomHostSdk, OpenModalOptions } from "@atlas/shared-types";

/** Add product-specific host SDK capabilities here. Hooks are supported. */
export type CustomerHostSdk = CustomHostSdk;

export interface WidgetModalRequest {
  readonly widgetId: string;
  readonly options: OpenModalOptions;
  readonly resolve: (data: unknown) => void;
}

interface WidgetModalControls {
  readonly open: CustomHostSdk["openModal"];
  readonly settle: (data: unknown) => void;
  readonly modalRef: RefObject<HTMLIonModalElement | null>;
}

// Controls stay stable so the SDK options hook never re-renders on modal state.
const WidgetModalControlsContext = createContext<
  WidgetModalControls | undefined
>(undefined);
const WidgetModalRequestContext = createContext<WidgetModalRequest | undefined>(
  undefined,
);

export function useWidgetModalControls(): WidgetModalControls {
  const controls = useContext(WidgetModalControlsContext);
  if (!controls) {
    throw new Error(
      "useWidgetModalControls must be used inside HostProviders.",
    );
  }
  return controls;
}

export function useWidgetModalRequest(): WidgetModalRequest | undefined {
  return useContext(WidgetModalRequestContext);
}

function WidgetModalProvider({ children }: { children?: ReactNode }) {
  const [request, setRequest] = useState<WidgetModalRequest>();
  const modalRef = useRef<HTMLIonModalElement>(null);

  const controls = useMemo<WidgetModalControls>(
    () => ({
      open: <TResult = void,>(widgetId: string, options: OpenModalOptions) =>
        new Promise<TResult | undefined>((resolve) => {
          setRequest((previous) => {
            previous?.resolve(undefined);
            return {
              widgetId,
              options,
              resolve: (data) => resolve(data as TResult | undefined),
            };
          });
        }),
      settle: (data) => {
        setRequest((previous) => {
          previous?.resolve(data);
          return undefined;
        });
      },
      modalRef,
    }),
    [],
  );

  return (
    <WidgetModalControlsContext.Provider value={controls}>
      <WidgetModalRequestContext.Provider value={request}>
        {children}
      </WidgetModalRequestContext.Provider>
    </WidgetModalControlsContext.Provider>
  );
}

/** Wrap the host with product providers here, such as a query client. */
export function HostProviders({ children }: { children?: ReactNode }) {
  return (
    <StrictMode>
      <WidgetModalProvider>{children}</WidgetModalProvider>
    </StrictMode>
  );
}

export function useCustomHostSdkOptions(): HostSdkOptions<CustomerHostSdk> {
  const { open } = useWidgetModalControls();
  return { openModal: open };
}
