import type { HostSdkOptions } from "@atlas/runtime/react";

/** Add product-specific host SDK capabilities here. Hooks are supported. */
export interface CustomerHostSdk {}

export function useCustomHostSdkOptions(): HostSdkOptions<CustomerHostSdk> {
  return {};
}
