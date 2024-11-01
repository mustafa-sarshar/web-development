import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LineChartComponent } from "./line-chart.component";

const routes: Routes = [
	{
		path: "",
		component: LineChartComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LineChartRoutingModule {}
