import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BarChartComponent } from "./bar-chart.component";
import { BarChartService } from "./bar-chart.service";
import { BarChartRoutingModule } from "./bar-chart-routing.module";

@NgModule({
	declarations: [BarChartComponent],
	imports: [CommonModule, BarChartRoutingModule],
	providers: [BarChartService],
	exports: [BarChartComponent],
})
export class BarChartModule {}
