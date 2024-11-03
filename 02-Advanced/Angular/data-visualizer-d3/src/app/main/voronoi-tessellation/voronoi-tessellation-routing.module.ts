import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { VoronoiTessellationComponent } from "./voronoi-tessellation.component";

const routes: Routes = [
	{
		path: "",
		component: VoronoiTessellationComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VoronoiTessellationRoutingModule {}
