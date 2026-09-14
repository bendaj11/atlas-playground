import { Routes } from "@angular/router";
import { AtlasDefaultHostRouteComponent } from "@atlas/runtime/angular";

export const routes: Routes = [
  { path: "**", component: AtlasDefaultHostRouteComponent },
];
