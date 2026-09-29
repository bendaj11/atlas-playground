import { useLayoutEffect } from "react";
import { useAtlasStyleTarget } from "@atlas/sdk/react";
import css from "./tailwind.css?inline";

/**
 * Injects the app stylesheet into the Atlas style target (the shadow root).
 * A plain `import "./tailwind.css"` lands in `document.head` during Vite dev,
 * where it cannot reach the app or its exported widgets.
 */
export function AtlasStyles() {
  const target = useAtlasStyleTarget();

  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    target.appendChild(style);
    return () => style.remove();
  }, [target]);

  return null;
}
