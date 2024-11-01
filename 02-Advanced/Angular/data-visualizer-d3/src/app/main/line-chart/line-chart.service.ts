import { Injectable } from "@angular/core";
import * as d3 from "d3";

import { UtilityService } from "../../shared/services/utility/utility.service";
import {
	ChartId,
	LineChartData,
	PriceRowData,
} from "../line-chart/line-chart.definitions";

@Injectable()
export class LineChartService {
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
		// const dataX_1 = this._utilityService.generateRandomNumbers(N, 0, 100, "DECIMAL", [0]);
		const dataX_1 = this._utilityService.generateSequentialNumbers(
			N,
			0,
			100,
			"DECIMAL",
			[],
		);
		const dataY_1 = this._utilityService.generateRandomNumbers(
			N,
			0,
			50,
			"DECIMAL",
			[0],
		);
		// const dataX_2 = this._utilityService.generateRandomNumbers(N, -100, 100, "INTEGER", [0]);
		const dataX_2 = this._utilityService.generateSequentialNumbers(
			N,
			0,
			100,
			"INTEGER",
			[],
		);
		const dataY_2 = this._utilityService.generateRandomNumbers(
			N,
			0,
			100,
			"INTEGER",
			[0],
		);

		const data: LineChartData[] =
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
		const colorsStrokeContrast =
			this._utilityService.generateRandomColorCodes(N);

		// Declare the chart dimensions and margins.
		const maxWidth = contentEl.scrollWidth;
		const maxHeight = contentEl.scrollHeight;
		const margins = { top: 20, right: 2, bottom: 2, left: 2 };
		const chartWidth = maxWidth - margins.left - margins.right;
		const chartHeight = maxHeight - margins.top - margins.bottom;

		const lineHorizontalSpace = 1;
		const lineLength = chartWidth / N - lineHorizontalSpace;

		const container = d3.select(contentEl);
		const svg = container
			.append("svg")
			.attr("height", chartHeight)
			.attr("width", chartWidth);

		// Line generator
		const lineGenerator = d3
			.line()
			/* @ts-ignore */
			.x((d: LineChartData, i: number) => {
				return d.x + i * lineLength;
			})
			/* @ts-ignore */
			.y((d: LineChartData, i: number) => {
				return chartHeight - d.y;
			})
			.curve(d3.curveCardinal);

		/* @ts-ignore */
		const path = svg.append("path").attr("d", lineGenerator(data));
		path.attr("fill", "none").attr("stroke", "black");

		// Add dots
		const dots = svg
			.selectAll("circle.dot")
			.data(data)
			.enter()
			.append("circle");
		dots
			.attr("class", "dot")
			.attr("cx", (d: LineChartData, i: number) => {
				return d.x + i * lineLength;
			})
			.attr("cy", (d: LineChartData, i: number) => {
				return chartHeight - d.y;
			})
			.attr("r", "2")
			.attr("fill", "red");
	}

	public async drawPricesCSV(contentEl: HTMLDivElement) {
		const html = await d3.blob("https://enable-cors.org");

		const dateParser = d3.timeParse("%m/%d/%Y");
		const dataConvert: PriceRowData[] = [];
		try {
			const data: d3.DSVRowArray<string> = await d3.csv("data/prices.csv");

			for (let i = 0; i < data.length; i++) {
				if (data[i]["month"] && data[i]["price"]) {
					dataConvert.push({
						month: dateParser(data[i]["month"]),
						price: Number(data[i]["price"].trim().slice(1)),
					});
				}
			}

			const chartHeight = 300;
			const chartWidth = 500;

			const max = d3.max(dataConvert, (d: PriceRowData) => {
				return d.price;
			});
			const maxDate = d3.max(dataConvert, (d: PriceRowData) => {
				return d.month;
			});
			const minDate = d3.min(dataConvert, (d: PriceRowData) => {
				return d.month;
			});

			const yScaler = d3
				.scaleLinear()
				.domain([0, max ? max : 1])
				.range([chartHeight, 0]);
			const yAxis = d3.axisLeft(yScaler);

			const xScaler = d3
				.scaleTime()
				.domain([minDate ? minDate : 0, maxDate ? maxDate : 1])
				.range([0, chartWidth]);
			const xAxis = d3.axisBottom(xScaler);

			// Let's draw it
			const margins = { top: 40, right: 50, bottom: 0, left: 50 };

			const container = d3.select(contentEl);
			const svg = container
				.append("svg")
				.attr("height", "100%")
				.attr("width", "100%");

			const chartGroup = svg
				.append("g")
				.attr("transform", `translate(${margins.left},${margins.top})`);

			const lineGenerator = d3
				.line()
				.x((d: any) => {
					return xScaler(d.month);
				})
				.y((d: any) => {
					return d.price;
				});

			// Draw the values
			chartGroup
				.append("path")
				/* @ts-ignore */
				.attr("d", lineGenerator(dataConvert))
				.attr("fill", "none")
				.attr("stroke", "black");

			// Draw X Axis and Y Axis
			chartGroup
				.append("g")
				.attr("class", "x axis")
				.attr("transform", `translate(0,${chartHeight - 20})`)
				.call(xAxis);
			chartGroup.append("g").attr("class", "y axis").call(yAxis);
		} catch (err: any) {
			console.error(err.message);
		}
	}
}
