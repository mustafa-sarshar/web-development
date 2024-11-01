import { Injectable } from "@angular/core";
import * as d3 from "d3";

import { UtilityService } from "../../shared/services/utility/utility.service";

@Injectable()
export class VoronoiTessellationService {
	constructor(private readonly _utilityService: UtilityService) {}

	public async drawLayouts(layoutId: any, contentEl: HTMLDivElement) {
		const N = 100;
		const maxWidth = contentEl.scrollWidth;
		const maxHeight = contentEl.scrollHeight;
		const settings = {
			size: { h: maxHeight, w: maxWidth },
			margin: { l: 50, r: 50, t: 50, b: 0 },
		};

		const vertices = d3.range(N).map<d3.Delaunay.Point>((d: number) => {
			return [
				Math.random() * (maxWidth - settings.margin.l - settings.margin.r),
				Math.random() * (maxHeight - settings.margin.t - settings.margin.b),
			];
		});
		const delaunay = d3.Delaunay.from(vertices);
		const voronoi = delaunay.voronoi([
			0,
			0,
			maxWidth - settings.margin.l - settings.margin.r,
			maxHeight - settings.margin.t - settings.margin.b,
		]);

		const containerEl = d3.select(contentEl);
		const svg = containerEl
			.append("svg")
			.attr("width", settings.size.w)
			.attr("height", settings.size.h);

		// Add Polygons
		svg
			.append("g")
			.attr("class", "polygons")
			.selectAll("path")
			.data(voronoi.cellPolygons())
			.enter()
			.append("path")
			.attr("fill", "white")
			.attr("stroke", "lightsteelblue")
			.attr("d", (d: any) => {
				return `M${d.join("L")}Z`;
			})
			.attr(
				"transform",
				`translate(${(settings.margin.l + settings.margin.r) / 2},${(settings.margin.t + settings.margin.b) / 2})`,
			);

		// Add Centroids
		svg
			.append("g")
			.attr("class", "fuel")
			.selectAll("circle")
			.data(vertices)
			.enter()
			.append("circle")
			// .attr("fill", "steelblue")
			.attr("cx", (d: any) => {
				return d[0];
			})
			.attr("cy", (d: any) => {
				return d[1];
			})
			.attr("r", "2.5")
			.attr(
				"transform",
				`translate(${(settings.margin.l + settings.margin.r) / 2},${(settings.margin.t + settings.margin.b) / 2})`,
			);
	}
}
