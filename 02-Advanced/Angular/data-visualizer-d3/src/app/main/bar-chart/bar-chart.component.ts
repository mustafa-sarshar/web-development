import {
	AfterViewInit,
	Component,
	ElementRef,
	Type,
	ViewChild,
} from "@angular/core";

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

	constructor(private readonly _barChartService: BarChartService) {}

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

			this._barChartService.drawCharts(chartId, this.contentChartEl);
		}
	}
}
