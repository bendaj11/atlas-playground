import type { AtlasAppConfig } from "@atlas/schema" with {
  "resolution-mode": "import",
};

export default {
  type: "app",
  id: "85cdc884-3fda-46da-ac0b-73697f4a62c8",
  name: "React App",
  framework: "react",
  routes: [
    {
      hostId: "27a27fea-5a2c-4ed8-bd31-6e56613932bb",
      path: "/react-app",
    },
    {
      hostId: "48478785-f508-4afc-9565-28fb7648a28e",
      path: "/react-app",
    },
  ],
} satisfies AtlasAppConfig;
