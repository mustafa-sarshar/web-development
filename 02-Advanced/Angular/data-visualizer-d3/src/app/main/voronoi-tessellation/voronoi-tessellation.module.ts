import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VoronoiTessellationComponent } from "./voronoi-tessellation.component";
import { VoronoiTessellationService } from "./voronoi-tessellation.service";
import { VoronoiTessellationRoutingModule } from "./voronoi-tessellation-routing.module";

@NgModule({
	declarations: [VoronoiTessellationComponent],
	imports: [CommonModule, VoronoiTessellationRoutingModule],
	providers: [VoronoiTessellationService],
	exports: [VoronoiTessellationComponent],
})
export class VoronoiTessellationModule {}
