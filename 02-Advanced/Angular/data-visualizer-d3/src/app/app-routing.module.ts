import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "", pathMatch: "full" },
	{
		path: "line-chart",
		loadChildren: () =>
			import("./main/line-chart/line-chart.module").then(
				(m) => m.LineChartModule,
			),
	},
	{
		path: "bar-chart",
		loadChildren: () =>
			import("./main/bar-chart/bar-chart.module").then((m) => m.BarChartModule),
	},
	{
		path: "area-chart",
		loadChildren: () =>
			import("./main/area-chart/area-chart.module").then(
				(m) => m.AreaChartModule,
			),
	},
	{
		path: "tree-layout",
		loadChildren: () =>
			import("./main/tree-layout/tree-layout.module").then(
				(m) => m.TreeLayoutModule,
			),
	},
	{
		path: "voronoi-tessellation",
		loadChildren: () =>
			import("./main/voronoi-tessellation/voronoi-tessellation.module").then(
				(m) => m.VoronoiTessellationModule,
			),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
