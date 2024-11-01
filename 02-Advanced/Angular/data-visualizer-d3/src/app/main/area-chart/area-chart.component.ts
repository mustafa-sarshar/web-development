import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	ViewChild,
} from "@angular/core";

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

	constructor(private readonly _areaChartService: AreaChartService) {}

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

			this._areaChartService.drawCharts(chartId, this.contentChartEl);
		}
	}
}
