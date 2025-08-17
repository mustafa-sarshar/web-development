import { Routes } from "@angular/router";

export const routes: Routes = [
  // Music Generator
  {
    path: "music-generator",
    loadComponent: () =>
      import("./music-generator/music-generator.component").then(
        (m) => m.MusicGeneratorComponent
      ),
  },
  // Music Player - Techno
  {
    path: "music-player-techno",
    loadComponent: () =>
      import("./music-player-techno/music-player-techno.component").then(
        (m) => m.MusicPlayerTechnoComponent
      ),
  },
  {
    path: "",
    redirectTo: "/music-generator",
    pathMatch: "full",
  },
];
