import { Routes } from "@angular/router";

import { AboutComponent } from "./about/about.component";
import { AppComponent } from "./app.component";
import { InfoComponent } from "./info/info.component";

export const routes: Routes = [
  { path: "info", component: InfoComponent },
  { path: "about", component: AboutComponent },
  { path: "home", component: AppComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }, // redirect to `first-component`
  //   { path: "**", component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
