import { Injectable } from "@angular/core";
import * as d3 from "d3";

import { UtilityService } from "../../shared/services/utility/utility.service";

@Injectable()
export class VoronoiTessellationService {
	constructor(private readonly _utilityService: UtilityService) {}

	public async drawLayouts(layoutId: any, contentEl: HTMLDivElement) {
		const N = 100;
		const maxWidth = contentEl.offsetWidth;
		const maxHeight = contentEl.offsetHeight;
		const settings = {
			size: { h: maxHeight, w: maxWidth },
			margin: { l: 50, r: 50, t: 50, b: 0 },
		};

		const vertices = d3.range(N).map<d3.Delaunay.Point>((d: number) => {
			return [Math.random() * (maxWidth - settings.margin.l - settings.margin.r), Math.random() * (maxHeight - settings.margin.t - settings.margin.b)];
		});
		const delaunay = d3.Delaunay.from(vertices);
		const voronoi = delaunay.voronoi([0, 0, maxWidth - settings.margin.l - settings.margin.r, maxHeight - settings.margin.t - settings.margin.b]);

		const d3ContainerEl = d3.select(contentEl);

		if (!d3ContainerEl.select("svg").empty()) {
			!d3ContainerEl.select("svg").remove();
		}

		// Add a DIV element as a tooltip
		const tooltip = d3ContainerEl.append("div").attr("class", "tooltip").style("opacity", "0").style("position", "absolute");

		const svgEl = d3ContainerEl
			.append("svg")
			.attr("width", settings.size.w)
			.attr("height", settings.size.h)
			.on("mouseout", () => {
				tooltip.html("").style("opacity", "0");
			});

		// Add a group
		const chartGroupEl = svgEl.append("g");

		// Add Polygons
		chartGroupEl
			.append("g")
			.attr("class", "polygons")
			.selectAll("path")
			.data(voronoi.cellPolygons())
			.enter()
			.append("path")
			.attr("fill", "white")
			.attr("stroke", "lightsteelblue")
			.attr("d", (d: d3.Delaunay.Point[]) => {
				return `M${d.join("L")}Z`;
			})
			.attr("transform", `translate(${(settings.margin.l + settings.margin.r) / 2},${(settings.margin.t + settings.margin.b) / 2})`)
			.on("mousemove", (e: any, d: d3.Delaunay.Point[]) => {
				tooltip.html(`Number of sides: ${d.length}`).style("opacity", "1").style("left", `${e.clientX}px`).style("top", `${e.clientY}px`);
			});

		// Add Centroids
		const pointsEl = chartGroupEl
			.append("g")
			.attr("class", "fuel")
			.selectAll("circle")
			.data(vertices)
			.enter()
			.append("circle")
			// .attr("fill", "steelblue")
			.attr("cx", (d: d3.Delaunay.Point) => {
				return d[0];
			})
			.attr("cy", (d: d3.Delaunay.Point) => {
				return d[1];
			})
			.attr("r", "2.5")
			.attr("transform", `translate(${(settings.margin.l + settings.margin.r) / 2},${(settings.margin.t + settings.margin.b) / 2})`);

		// Add Style and Transition to the 30th polygon
		d3ContainerEl
			.select("g.polygons")
			.select("path:nth-child(30)")
			.transition()
			.duration(1000)
			.delay(1000)
			.style("fill", "lightblue")
			.transition()
			.duration(1000)
			.delay(1000)
			.style("fill", "darkblue");

		// Add Zoom and Drag features
		const zoomer = d3.zoom().on("zoom", (e: any) => {
			const transform = e.transform;
			chartGroupEl.attr("transform", transform);
			pointsEl.attr("r", 2 / Math.sqrt(transform.k));
		});

		svgEl
			/* @ts-ignore */
			.call(zoomer)
			/* @ts-ignore */
			.call(zoomer.transform, d3.zoomIdentity);
	}
}
