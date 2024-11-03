import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import * as d3 from "d3";

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

	constructor(private readonly _voronoiTessellationService: VoronoiTessellationService) {}

	public ngAfterViewInit(): void {
		if (this.contentChartElRef) {
			this.contentChartEl = this.contentChartElRef.nativeElement;
		}
	}

	public onClickLayout(layoutId: any) {
		if (this.contentChartEl) {
			this._voronoiTessellationService.drawLayouts(layoutId, this.contentChartEl);
		}
	}

	@HostListener("window:resize", ["$event"])
	public onResize(event: any) {
		if (this.contentChartEl) {
			const d3ContainerEl = d3.select(this.contentChartEl);

			if (!d3ContainerEl.select("svg").empty()) {
				this._voronoiTessellationService.drawLayouts("Chart_1", this.contentChartEl);
			}
		}
	}
}
