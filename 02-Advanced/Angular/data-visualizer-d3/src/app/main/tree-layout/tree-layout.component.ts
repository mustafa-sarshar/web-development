import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { TreeLayoutService } from "./tree-layout.service";

@Component({
	selector: "app-tree-layout",
	templateUrl: "./tree-layout.component.html",
	styleUrl: "./tree-layout.component.scss",
})
export class TreeLayoutComponent implements AfterViewInit {
	@ViewChild("contentChart", { static: true })
	public contentChartElRef?: ElementRef;
	public contentChartEl?: HTMLDivElement;

	constructor(private readonly _treeLayoutService: TreeLayoutService) {}

	public ngAfterViewInit(): void {
		if (this.contentChartElRef) {
			this.contentChartEl = this.contentChartElRef.nativeElement;
		}
	}

	public onClickLayout(layoutId: any) {
		if (this.contentChartEl) {
			this._treeLayoutService.drawLayouts(layoutId, this.contentChartEl);
		}
	}
}
