import "./index.css";
import type { CustomHostSdk } from "@atlas/shared-types";
import { useAtlasSdk } from "@atlas/sdk/react";

export function App() {
  const { openModal, navigateTo } = useAtlasSdk<CustomHostSdk>();

  return (
    <section>
      <h1>This is React App</h1>
      <br />
      <button
        onClick={() =>
          void openModal("1f5c693e-0d27-4b7c-bf93-6beea8a1d95b", {
            inputs: { subtitle: "Opened from React App" },
          })
        }
      >
        Open Angular Widget Modal
      </button>

      <button
        onClick={() => navigateTo("f2fa2e8e-1e8a-467a-af1e-aa24b543a08a")}
      >
        Go to angular app
      </button>
    </section>
  );
}
