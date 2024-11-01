import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

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

	constructor(private readonly _lineChartService: LineChartService) {}

	public ngAfterViewInit(): void {
		if (this.contentChartElRef) {
			this.contentChartEl = this.contentChartElRef.nativeElement;

			if (this.contentChartEl) {
				this.contentChartEl.innerHTML = "";
			}
		}
	}

	public onClickCharts(chartId: ChartId) {
		if (this.contentChartEl) {
			this.contentChartEl.innerHTML = "";

			if (chartId === "CHART_3") {
				this._lineChartService.drawPricesCSV(this.contentChartEl);
			} else {
				this._lineChartService.drawCharts(chartId, this.contentChartEl);
			}
		}
	}
}
