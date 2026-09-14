import type { AtlasAppConfig } from "@atlas/schema" with {
  "resolution-mode": "import",
};

export default {
  type: "app",
  id: "f2fa2e8e-1e8a-467a-af1e-aa24b543a08a",
  name: "Angular App",
  framework: "angular",
  routes: [
    {
      hostId: "27a27fea-5a2c-4ed8-bd31-6e56613932bb",
      path: "/angular-app",
    },
    {
      hostId: "27a27fea-5a2c-4ed8-bd31-6e56613932bb",
      path: "/",
      match: "full",
      redirectTo: "/angular-app",
    },
    {
      hostId: "48478785-f508-4afc-9565-28fb7648a28e",
      path: "/angular-app",
    },
    {
      hostId: "48478785-f508-4afc-9565-28fb7648a28e",
      path: "/",
      match: "full",
      redirectTo: "/angular-app",
    },
  ],
} satisfies AtlasAppConfig;
