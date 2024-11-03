export type ChartId = "CHART_1" | "CHART_2" | "CHART_3" | "CHART_STREAM";
export type LineChartData = { x: number; y: number };
export type StreamChartData = { x: number; y: number; c: number };
export type PriceRowData = { month: Date | null; price: number };
