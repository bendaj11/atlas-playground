import { createAngularV4FederationConfig } from "@atlas/sdk/federation-config";

export default await createAngularV4FederationConfig({
  projectRoot: import.meta.dirname,
  name: "atlas_angular_app",
  expose: "app",
  nativeFederationPackage: "@angular-architects/native-federation-v4",
  // Add skip, exposes, shared, or other Native Federation options here.
  skip: [],
});
