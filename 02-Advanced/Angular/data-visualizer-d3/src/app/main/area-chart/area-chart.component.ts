import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import * as d3 from "d3";

import { AreaChartService } from "./area-chart.service";
import { ChartId } from "./area-chart.definitions";

@Component({
	selector: "app-area-chart",
	templateUrl: "./area-chart.component.html",
	styleUrl: "./area-chart.component.scss",
})
export class AreaChartComponent implements AfterViewInit {
	@ViewChild("contentChart", { static: true })
	public contentChartElRef?: ElementRef;
	public contentChartEl?: HTMLDivElement;
	public chartId?: ChartId;

	constructor(private readonly _areaChartService: AreaChartService) {}

	public ngAfterViewInit(): void {
		if (this.contentChartElRef) {
			this.contentChartEl = this.contentChartElRef.nativeElement;
		}
	}

	public onClickCharts(chartId: ChartId) {
		if (this.contentChartEl) {
			this.chartId = chartId;
			this._areaChartService.drawCharts(chartId, this.contentChartEl);
		}
	}

	@HostListener("window:resize", ["$event"])
	public onResize(event: any) {
		if (this.contentChartEl && this.chartId) {
			const d3ContainerEl = d3.select(this.contentChartEl);

			if (!d3ContainerEl.select("svg").empty()) {
				this._areaChartService.drawCharts(this.chartId, this.contentChartEl);
			}
		}
	}
}
