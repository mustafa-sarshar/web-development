import { Injectable } from "@angular/core";
import * as d3 from "d3";

import { UtilityService } from "../../shared/services/utility/utility.service";
import { ChartId } from "./bar-chart.definitions";

@Injectable()
export class BarChartService {
	constructor(private readonly _utilityService: UtilityService) {}

	public generateRandomNumbers(
		N: number,
		min?: number,
		max?: number,
		outputType?: "INTEGER" | "DECIMAL",
		exclusions: number[] = [],
	) {
		return this._utilityService.generateRandomNumbers(
			N,
			min,
			max,
			outputType,
			exclusions,
		);
	}

	public drawCharts(chartId: ChartId, contentEl: HTMLDivElement) {
		const N: number = 20;
		const data_1 = this._utilityService.generateRandomNumbers(
			N,
			0,
			100,
			"DECIMAL",
			[0],
		);
		const data_2 = this._utilityService.generateRandomNumbers(
			N,
			20,
			2000,
			"INTEGER",
			[0],
		);

		const data =
			chartId === "CHART_1"
				? this._utilityService.scaleValuesToRange(data_1.slice(), 0, 100)
				: this._utilityService.scaleValuesToRange(data_2.slice(), 0, 100);

		const colorsFillMain = this._utilityService.generateRandomColorCodes(N);
		const colorsFillContrast = this._utilityService.generateRandomColorCodes(N);

		// Declare the chart dimensions and margins.
		const maxWidth = contentEl.scrollWidth;
		// const maxHeight = contentEl.scrollHeight;
		const maxHeight = 300;
		const margins = { top: 30, right: 4, bottom: 20, left: 30 };
		const chartWidth = maxWidth - margins.left - margins.right;
		const chartHeight = maxHeight - margins.top - margins.bottom;

		console.log(data.map((val: number) => String(val.toFixed(2))));

		const barHorizontalSpace = 1;
		const barWidth = chartWidth / N - barHorizontalSpace;

		// Generate Scaler for X
		const xScaler = d3
			.scaleOrdinal()
			.domain(data.map((val: number) => String(val.toFixed(0))))
			.range(
				this._utilityService.generateSequentialNumbers(
					N,
					0,
					chartWidth,
					"INTEGER",
					[],
				),
			);
		// Generate X Axis
		/* @ts-ignore */
		const xAxis = d3.axisBottom(xScaler);

		const container = d3.select(contentEl);
		const svg = container
			.append("svg")
			.attr("height", chartHeight)
			.attr("width", chartWidth);

		const chartGroup = svg
			.append("g")
			.attr("transform", `translate(${margins.left},${margins.top})`);

		// Add rectangles
		const rects = chartGroup
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect");
		rects
			.attr("height", (d: number) => {
				return d;
			})
			.attr("width", barWidth)
			.attr("x", (d: number, i: number) => {
				return i + i * barWidth;
			})
			.attr("y", (d: number) => {
				return chartHeight - d;
			})
			.attr("fill", (d: number, i: number) => {
				return colorsFillMain[i];
			});

		// Add circles on top of bars
		const circlesGroup1 = chartGroup
			.selectAll("circle.circle__group-1")
			.data(data)
			.enter()
			.append("circle");
		circlesGroup1
			.attr("class", "circles__group-1")
			.attr("cx", (d: number, i: number) => {
				return i + barWidth / 2 + i * barWidth;
			})
			.attr("cy", (d: number) => {
				return chartHeight - d;
			})
			.attr("r", (d: number, i: number) => {
				return (
					this._utilityService.scaleValuesToRange(data, 0, barWidth / 2)[i] / 2
				);
			})
			.attr("fill", (d: number, i: number) => {
				return colorsFillContrast[i];
			});

		// Add other circles on top of bars
		const circlesGroup2 = chartGroup
			.selectAll("circle.circle__group-2")
			.data(data)
			.enter()
			.append("circle");
		circlesGroup2
			.attr("class", "circle__group-2")
			.attr("cx", (d: number, i: number) => {
				return i + barWidth / 2 + i * barWidth;
			})
			.attr("cy", (d: number) => {
				return chartHeight - d * 1.5;
			})
			.attr("r", (d: number, i: number) => {
				return (
					this._utilityService.scaleValuesToRange(data, 0, barWidth / 2)[i] / 2
				);
			})
			.attr("fill", (d: number, i: number) => {
				return colorsFillMain[i];
			});

		// Add ellipses inside bars
		const ellipses = chartGroup
			.selectAll("ellipse")
			.data(data)
			.enter()
			.append("ellipse");
		ellipses
			.attr("cx", (d: number, i: number) => {
				return i + barWidth / 2 + i * barWidth;
			})
			.attr("cy", (d: number) => {
				return chartHeight - d / 2;
			})
			.attr("rx", (d: number, i: number) => {
				return this._utilityService.scaleValuesToRange(data, 0, barWidth / 2)[
					i
				];
			})
			.attr("ry", (d: number, i: number) => {
				return this._utilityService.scaleValuesToRange(data, 0, d / 2)[i];
			})
			.attr("fill", (d: number, i: number) => {
				return colorsFillContrast[i];
			});

		// Add labels to the bars
		const labels = chartGroup
			.selectAll("text")
			.data(data)
			.enter()
			.append("text");
		labels
			.attr("x", (d: number, i: number) => {
				return i + barWidth / 2 + i * barWidth;
			})
			.attr("y", (d: number) => {
				return chartHeight - d / 2;
			})
			.attr("fill", (d: number, i: number) => {
				return colorsFillMain[i];
			})
			.attr("font-size", "10")
			.attr("text-anchor", "middle")
			.attr("dominant-baseline", "middle")
			.text((d: number) => {
				return Math.floor(d);
			});

		// Axis Groups
		const xAxisGroup = chartGroup.append("g");
		xAxisGroup
			.attr("class", "axis x")
			.attr("transform", `translate(${margins.right}, 0)`)
			.call(xAxis);
	}
}
