import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BarChartComponent } from "./bar-chart.component";

const routes: Routes = [
	{
		path: "",
		component: BarChartComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BarChartRoutingModule {}
