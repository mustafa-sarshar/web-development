import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () =>
      import("./home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "stop",
    loadComponent: () =>
      import("./stop/stop.component").then((c) => c.StopComponent),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];
