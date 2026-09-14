import { createApplication } from "@angular/platform-browser";
import { defineApp } from "@atlas/sdk/angular";
import { AppComponent } from "./app/app.component";
import { createAppConfig } from "./app/app.config";

export default defineApp(async ({ container, styleTarget, sdk, context }) => {
  const element = document.createElement("atlas-angular-app-root");
  container.append(element);

  const app = await createApplication(
    createAppConfig({ context, sdk, styleTarget }),
  );
  app.bootstrap(AppComponent, element);

  return {
    unmount() {
      app.destroy();
      element.remove();
    },
  };
});
