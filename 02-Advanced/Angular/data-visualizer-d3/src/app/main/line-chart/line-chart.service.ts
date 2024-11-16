import { Injectable } from "@angular/core";
import * as d3 from "d3";

import { UtilityService } from "../../shared/services/utility/utility.service";
import { ChartId, LineChartData, PriceRowData, StreamChartData } from "../line-chart/line-chart.definitions";

@Injectable()
export class LineChartService {
	private _intervalId: any;

	constructor(private readonly _utilityService: UtilityService) {}

	public drawCharts(chartId: ChartId, contentEl: HTMLDivElement) {
		const N: number = 20;
		// const dataX_1 = this._utilityService.generateRandomNumbers(N, 0, 100, "DECIMAL", [0]);
		const dataX_1 = this._utilityService.generateSequentialNumbers(N, 0, 100, "DECIMAL", []);
		const dataY_1 = this._utilityService.generateRandomNumbers(N, 0, 50, "DECIMAL", [0]);
		// const dataX_2 = this._utilityService.generateRandomNumbers(N, -100, 100, "INTEGER", [0]);
		const dataX_2 = this._utilityService.generateSequentialNumbers(N, 0, 100, "INTEGER", []);
		const dataY_2 = this._utilityService.generateRandomNumbers(N, 0, 100, "INTEGER", [0]);

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
		const colorsStrokeContrast = this._utilityService.generateRandomColorCodes(N);

		// Declare the chart dimensions and margins.
		const maxWidth = contentEl.offsetWidth;
		const maxHeight = contentEl.offsetHeight;
		const margins = { top: 20, right: 2, bottom: 2, left: 2 };
		const chartWidth = maxWidth - margins.left - margins.right;
		const chartHeight = maxHeight - margins.top - margins.bottom;

		const lineHorizontalSpace = 1;
		const lineLength = chartWidth / N - lineHorizontalSpace;

		const d3ContainerEl = d3.select(contentEl);

		if (!d3ContainerEl.select("svg").empty()) {
			!d3ContainerEl.select("svg").remove();
		}

		const svg = d3ContainerEl.append("svg").attr("height", chartHeight).attr("width", chartWidth);

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
		const dots = svg.selectAll("circle.dot").data(data).enter().append("circle");
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
			const chartWidth = contentEl.offsetWidth;

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

			const d3ContainerEl = d3.select(contentEl);

			if (!d3ContainerEl.select("svg").empty()) {
				!d3ContainerEl.select("svg").remove();
			}

			const svg = d3ContainerEl.append("svg").attr("height", "100%").attr("width", "100%");

			const chartGroup = svg.append("g").attr("transform", `translate(${margins.left},${margins.top})`);

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

	public drawStreamData(contentEl: HTMLDivElement) {
		const N: number = 20;
		const X = this._utilityService.generateSequentialNumbers(N, 0, 100, "DECIMAL", []);
		const y = this._utilityService.generateRandomNumbers(N, 0, 50, "DECIMAL", [0]);
		let data: StreamChartData[] = X.map((x, i) => ({
			x: x,
			y: y[i],
			c: i,
		}));

		const nIntervalRound: number = 100;
		let currentRound = 0;
		let lastIndex = data.length;

		if (this._intervalId) {
			window.clearInterval(this._intervalId);
		}

		this._intervalId = window.setInterval(() => {
			// console.log("Round:", currentRound);

			if (currentRound < nIntervalRound) {
				currentRound++;
				this._drawData(contentEl, data);

				const dataNew: StreamChartData = {
					x: this._utilityService.generateRandomNumber(0, 100, "DECIMAL", []),
					y: this._utilityService.generateRandomNumber(0, 100, "INTEGER", []),
					c: lastIndex++,
				};
				// console.log("Data New:", dataNew);

				data.shift();
				data.push(dataNew);
			} else {
				window.clearInterval(this._intervalId);
				this._intervalId = undefined;

				// console.warn("Stream finished!");
			}
		}, 10);
	}

	private _drawData(contentEl: HTMLDivElement, data: StreamChartData[]) {
		// Declare the chart dimensions and margins.
		const settings = {
			size: { w: contentEl.offsetWidth, h: contentEl.offsetHeight },
			margin: { l: 50, r: 50, t: 50, b: 0 },
		};
		const lineLength = Math.floor(settings.size.w / data.length) - 6;

		const d3ContainerEl = d3.select(contentEl);

		if (!d3ContainerEl.select("svg").empty()) {
			!d3ContainerEl.select("svg").remove();
		}

		const svg = d3ContainerEl
			.append("svg")
			.attr("height", settings.size.w - settings.margin.t - settings.margin.b)
			.attr("width", settings.size.w - settings.margin.l - settings.margin.r);

		// Line generator
		const lineGenerator = d3
			.line()
			/* @ts-ignore */
			.x((d: StreamChartData, i: number) => {
				return i * (lineLength - 1);
			})
			/* @ts-ignore */
			.y((d: StreamChartData, i: number) => {
				return d.y;
			})
			.curve(d3.curveCardinal);

		// Generate Scaler for X
		const xScaler: any = d3
			.scaleOrdinal()
			.domain(data.map((d: StreamChartData) => String(d.c + 1)))
			.range(this._utilityService.generateSequentialNumbers(data.length, 0, data.length * (lineLength - 1), "INTEGER", []));
		// Generate X Axis
		const xAxis = d3.axisBottom(xScaler);

		const chartGroup = svg.append("g").attr("transform", `translate(${settings.margin.l},${settings.margin.t})`);

		/* @ts-ignore */
		chartGroup.append("path").attr("d", lineGenerator(data)).attr("fill", "none").attr("stroke", "black");

		// Add dots
		chartGroup
			.selectAll("circle.dot")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d: StreamChartData, i: number) => {
				return i * (lineLength - 1);
			})
			.attr("cy", (d: StreamChartData, i: number) => {
				return d.y;
			})
			.attr("r", "2")
			.attr("fill", "red");

		// Axis Groups
		chartGroup
			.append("g")
			.attr("class", "axis x")
			.attr("transform", `translate(${0}, ${settings.size.h - settings.margin.t})`)
			.call(xAxis);
	}
}
