import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import * as d3 from "d3";

import { BarChartService } from "./bar-chart.service";
import { ChartId } from "./bar-chart.definitions";

@Component({
	selector: "app-bar-chart",
	templateUrl: "./bar-chart.component.html",
	styleUrl: "./bar-chart.component.scss",
})
export class BarChartComponent implements AfterViewInit {
	@ViewChild("contentChart", { static: true })
	public contentChartElRef?: ElementRef;
	public contentChartEl?: HTMLDivElement;
	public chartId?: ChartId;

	constructor(private readonly _barChartService: BarChartService) {}

	public ngAfterViewInit(): void {
		if (this.contentChartElRef) {
			this.contentChartEl = this.contentChartElRef.nativeElement;
		}
	}

	public onClickCharts(chartId: ChartId) {
		if (this.contentChartEl) {
			this.chartId = chartId;
			this._barChartService.drawCharts(chartId, this.contentChartEl);
		}
	}

	@HostListener("window:resize", ["$event"])
	public onResize(event: any) {
		if (this.contentChartEl && this.chartId) {
			const d3ContainerEl = d3.select(this.contentChartEl);

			if (!d3ContainerEl.select("svg").empty()) {
				this._barChartService.drawCharts(this.chartId, this.contentChartEl);
			}
		}
	}
}
