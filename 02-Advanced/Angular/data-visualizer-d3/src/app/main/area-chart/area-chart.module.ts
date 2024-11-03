import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AreaChartComponent } from "./area-chart.component";
import { AreaChartService } from "./area-chart.service";
import { AreaChartRoutingModule } from "./area-chart-routing.module";

@NgModule({
	declarations: [AreaChartComponent],
	imports: [CommonModule, AreaChartRoutingModule],
	providers: [AreaChartService],
	exports: [AreaChartComponent],
})
export class AreaChartModule {}
