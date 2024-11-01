import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LineChartComponent } from "./line-chart.component";
import { LineChartService } from "./line-chart.service";
import { LineChartRoutingModule } from "./line-chart-routing.module";

@NgModule({
	declarations: [LineChartComponent],
	imports: [CommonModule, LineChartRoutingModule],
	providers: [LineChartService],
	exports: [LineChartComponent],
})
export class LineChartModule {}
