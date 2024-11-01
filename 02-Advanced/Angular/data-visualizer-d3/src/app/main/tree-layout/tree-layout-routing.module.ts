import { NgModule } from "@angular/core";

import { TreeLayoutComponent } from "./tree-layout.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		component: TreeLayoutComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TreeLayoutRoutingModule {}
