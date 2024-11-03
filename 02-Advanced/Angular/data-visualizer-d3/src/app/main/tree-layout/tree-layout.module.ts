import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TreeLayoutComponent } from "./tree-layout.component";
import { TreeLayoutService } from "./tree-layout.service";
import { TreeLayoutRoutingModule } from "./tree-layout-routing.module";

@NgModule({
	declarations: [TreeLayoutComponent],
	imports: [CommonModule, TreeLayoutRoutingModule],
	providers: [TreeLayoutService],
	exports: [TreeLayoutComponent],
})
export class TreeLayoutModule {}
