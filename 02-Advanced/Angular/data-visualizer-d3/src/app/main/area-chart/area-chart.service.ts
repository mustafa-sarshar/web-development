import { Injectable } from "@angular/core";
import * as d3 from "d3";

import { UtilityService } from "../../shared/services/utility/utility.service";
import { ChartId, AreaChartData } from "../area-chart/area-chart.definitions";

@Injectable()
export class AreaChartService {
	constructor(private readonly _utilityService: UtilityService) {}

	public generateRandomNumbers(N: number, min?: number, max?: number, outputType?: "INTEGER" | "DECIMAL", exclusions: number[] = []) {
		return this._utilityService.generateRandomNumbers(N, min, max, outputType, exclusions);
	}

	public drawCharts(chartId: ChartId, contentEl: HTMLDivElement) {
		const N: number = 20;
		// const dataX_1 = this._utilityService.generateRandomNumbers(N, 0, 100, "DECIMAL", [0]);
		const dataX_1 = this._utilityService.generateSequentialNumbers(N, 1, 100, "DECIMAL", [0]);
		const dataY_1 = this._utilityService.generateRandomNumbers(N, 0, 50, "DECIMAL", [0]);
		// const dataX_2 = this._utilityService.generateRandomNumbers(N, -100, 100, "INTEGER", [0]);
		const dataX_2 = this._utilityService.generateSequentialNumbers(N, 0, 100, "INTEGER", [0]);
		const dataY_2 = this._utilityService.generateRandomNumbers(N, 0, 100, "INTEGER", [0]);

		const dates = this._utilityService.generateDateRange(new Date("1980"), new Date("2024"), N);
		const dateParser = d3.timeParse("%Y");

		const data: AreaChartData[] =
			chartId === "CHART_1"
				? dataX_1.map((x, i) => ({
						x: x,
						y: dataY_1[i],
					}))
				: dataX_2.map((x, i) => ({
						x: x,
						y: dataY_2[i],
					}));

		const colorsStrokeMain = this._utilityService.generateRandomColorCodes(N);
		const colorsStrokeContrast = this._utilityService.generateRandomColorCodes(N);

		// Declare the chart dimensions and margins.
		const maxWidth = contentEl.offsetWidth;
		// const maxHeight = contentEl.scrollHeight;
		const maxHeight = 300;
		const margins = { top: 30, right: 4, bottom: 20, left: 30 };
		const chartWidth = maxWidth - margins.left - margins.right;
		const chartHeight = maxHeight - margins.top - margins.bottom;

		const lineHorizontalSpace = 1;
		const lineLength = chartWidth / N - lineHorizontalSpace;

		// Generate Scaler for X
		const xScaler = d3
			.scaleTime()
			.domain([dates[0], dates[dates.length - 1]])
			.range([0, chartWidth]);
		// Generate X Axis
		const xAxis = d3.axisBottom(xScaler).ticks(10);

		// Generate Scaler for Y
		const yScaler = d3
			.scaleLinear()
			.domain([0, chartId === "CHART_1" ? Math.max(...dataY_1) : Math.max(...dataY_2)]) // input
			.range([chartHeight, 0]); // output
		// Generate Y Axis
		const yAxis = d3.axisLeft(yScaler).ticks(N).tickPadding(3).tickSize(6);

		// Area generator
		const areaGenerator = d3
			.area()
			/* @ts-ignore */
			.x((d: AreaChartData, i: number) => {
				// return d.x + i * lineLength;
				return xScaler(dates[i]);
			})
			/* @ts-ignore */
			.y0((d: AreaChartData, i: number) => {
				return chartHeight;
			})
			/* @ts-ignore */
			.y1((d: AreaChartData, i: number) => {
				// return d.y;
				return yScaler(d.y); // scaled y
			})
			.curve(d3.curveCardinal);

		const d3ContainerEl = d3.select(contentEl);

		if (!d3ContainerEl.select("svg").empty()) {
			!d3ContainerEl.select("svg").remove();
		}

		const svg = d3ContainerEl.append("svg").attr("height", maxHeight).attr("width", maxWidth).attr("class", "content__chart__container");

		const chartGroup = svg.append("g").attr("transform", `translate(${margins.left},${margins.top})`);

		/* @ts-ignore */
		const area = chartGroup.append("path").attr("d", areaGenerator(data));
		area.attr("fill", "blue").attr("stroke", "black");

		// Add dots
		const dots = chartGroup.selectAll("circle.dot").data(data).enter().append("circle");
		dots
			.attr("class", "dot")
			.attr("cx", (d: AreaChartData, i: number) => {
				// return d.x + i * lineLength;
				return xScaler(dates[i]);
			})
			.attr("cy", (d: AreaChartData, i: number) => {
				// return d.y;
				return yScaler(d.y); // scaled y
			})
			.attr("r", "2")
			.attr("fill", "red");

		// Axis Groups
		const xAxisGroup = chartGroup.append("g");
		xAxisGroup.attr("class", "axis x").attr("transform", `translate(${0}, ${chartHeight})`).call(xAxis);
		const yAxisGroup = chartGroup.append("g");
		yAxisGroup.attr("class", "axis y").call(yAxis);
	}
}
