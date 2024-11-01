import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { VoronoiTessellationService } from "./voronoi-tessellation.service";

@Component({
	selector: "app-voronoi-tessellation",
	templateUrl: "./voronoi-tessellation.component.html",
	styleUrl: "./voronoi-tessellation.component.scss",
})
export class VoronoiTessellationComponent implements AfterViewInit {
	@ViewChild("contentChart", { static: true })
	public contentChartElRef?: ElementRef;
	public contentChartEl?: HTMLDivElement;

	constructor(
		private readonly _voronoiTessellationService: VoronoiTessellationService,
	) {}

	public ngAfterViewInit(): void {
		if (this.contentChartElRef) {
			this.contentChartEl = this.contentChartElRef.nativeElement;

			if (this.contentChartEl) {
				this.contentChartEl.innerHTML = "";
			}
		}
	}

	public onClickLayout(layoutId: any) {
		if (this.contentChartEl) {
			this.contentChartEl.innerHTML = "";

			this._voronoiTessellationService.drawLayouts(
				layoutId,
				this.contentChartEl,
			);
		}
	}
}
