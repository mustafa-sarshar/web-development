import { Injectable } from "@angular/core";
import * as d3 from "d3";

import { UtilityService } from "../../shared/services/utility/utility.service";

@Injectable()
export class TreeLayoutService {
	constructor(private readonly _utilityService: UtilityService) {}

	public async drawLayouts(layoutId: any, contentEl: HTMLDivElement) {
		const maxWidth = contentEl.offsetWidth;
		const maxHeight = contentEl.offsetHeight;
		const settings = {
			size: { h: maxHeight, w: maxWidth },
			margin: { l: 50, r: 50, t: 50, b: 0 },
		};

		const d3ContainerEl = d3.select(contentEl);

		if (!d3ContainerEl.select("svg").empty()) {
			!d3ContainerEl.select("svg").remove();
		}

		const svg = d3ContainerEl.append("svg").attr("width", settings.size.w).attr("height", settings.size.h);

		const tree = d3.tree().size([settings.size.w - 50, settings.size.h - 100]);

		const chartGroup = svg.append("g").attr("transform", `translate(${settings.margin.l},${settings.margin.t})`);

		try {
			const data = await d3.json<Array<unknown>>("data/tree-data.json");

			if (data) {
				const root = d3.hierarchy(data[0]);
				tree(root);

				chartGroup
					.selectAll("circle")
					.data(root.descendants())
					.enter()
					.append("circle")
					.attr("cx", (d: any) => {
						return d.x;
					})
					.attr("cy", (d: any) => {
						return d.y;
					})
					.attr("r", "5");

				chartGroup
					.selectAll("path")
					.data(root.descendants().slice(1))
					.enter()
					.append("path")
					.attr("stroke", "blue")
					.attr("fill", "none")
					.attr("stroke-width", "2")
					.attr("d", (d: any) => {
						return `M${d.x},${d.y}C${d.x},${(d.parent.y + d.y) / 2} ${d.parent.x},${(d.y + d.parent.y) / 2} ${d.parent.x},${d.parent.y}`;
					});
			}
		} catch (err: any) {
			console.error(err.message);
		}
	}
}
