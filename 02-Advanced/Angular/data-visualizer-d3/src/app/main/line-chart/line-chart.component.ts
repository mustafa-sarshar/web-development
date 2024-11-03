import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import * as d3 from "d3";

import { LineChartService } from "./line-chart.service";
import { ChartId } from "./line-chart.definitions";

@Component({
	selector: "app-line-chart",
	templateUrl: "./line-chart.component.html",
	styleUrl: "./line-chart.component.scss",
})
export class LineChartComponent implements AfterViewInit {
	@ViewChild("contentChart", { static: true })
	public contentChartElRef?: ElementRef;
	public contentChartEl?: HTMLDivElement;
	public chartId?: ChartId;

	constructor(private readonly _lineChartService: LineChartService) {}

	public ngAfterViewInit(): void {
		if (this.contentChartElRef) {
			this.contentChartEl = this.contentChartElRef.nativeElement;
		}
	}

	public onClickCharts(chartId: ChartId) {
		if (this.contentChartEl) {
			this.chartId = chartId;

			switch (chartId) {
				case "CHART_3":
					this._lineChartService.drawPricesCSV(this.contentChartEl);
					break;
				case "CHART_STREAM":
					this._lineChartService.drawStreamData(this.contentChartEl);
					break;
				default:
					this._lineChartService.drawCharts(chartId, this.contentChartEl);
					break;
			}
		}
	}

	@HostListener("window:resize", ["$event"])
	public onResize(event: any) {
		if (this.contentChartEl && this.chartId) {
			const d3ContainerEl = d3.select(this.contentChartEl);

			if (!d3ContainerEl.select("svg").empty()) {
				if (this.chartId === "CHART_3") {
					this._lineChartService.drawPricesCSV(this.contentChartEl);
				} else {
					this._lineChartService.drawCharts(this.chartId, this.contentChartEl);
				}
			}
		}
	}
}
