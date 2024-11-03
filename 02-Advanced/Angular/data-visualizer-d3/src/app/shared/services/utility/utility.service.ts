import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class UtilityService {
	constructor() {}

	public generateRandomNumber(min: number = 0, max: number = 100, outputType: "INTEGER" | "DECIMAL" = "INTEGER", exclusions: number[] = []): number {
		let randomNum: number | undefined = undefined;

		while (randomNum === undefined || exclusions.includes(randomNum)) {
			// Generate random number based on output type
			if (outputType === "INTEGER") {
				randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
			} else {
				randomNum = parseFloat((Math.random() * (max - min) + min).toFixed(2)); // Limit to 2 decimal places
			}
		}

		return randomNum;
	}

	public generateRandomNumbers(N: number, min: number = 0, max: number = 100, outputType: "INTEGER" | "DECIMAL" = "INTEGER", exclusions: number[] = []): number[] {
		const randomNumbers: Set<number> = new Set(); // Use a Set to avoid duplicates

		while (randomNumbers.size < N) {
			let randomNum: number;

			// Generate random number based on output type
			if (outputType === "INTEGER") {
				randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
			} else {
				randomNum = parseFloat((Math.random() * (max - min) + min).toFixed(2)); // Limit to 2 decimal places
			}

			// Check if the generated number is not in the exclusions
			if (!exclusions.includes(randomNum)) {
				randomNumbers.add(randomNum);
			}
		}

		return Array.from(randomNumbers).slice(); // Convert Set back to Array
	}

	public generateSequentialNumbers(N: number, start: number, end: number, outputType: "INTEGER" | "DECIMAL" = "INTEGER", exclusions: number[] = []): number[] {
		// If N is 0, generate all integers from start to end
		if (N === 0) {
			const result: number[] = [];
			for (let value = Math.ceil(start); value <= Math.floor(end); value++) {
				if (!exclusions.includes(value)) {
					result.push(value);
				}
			}
			return result;
		}

		if (N < 1) {
			throw new Error("N must be at least 0.");
		}

		const result: number[] = [];
		const step = (end - start) / (N - 1); // Calculate the step size

		for (let i = 0; i < N; i++) {
			let value = start + i * step; // Generate each value
			value = outputType === "DECIMAL" ? value : Math.round(value); // Round to nearest integer if not decimal

			// Skip excluded values
			while (exclusions.includes(value)) {
				i++; // Move to the next index to get the next value
				value = start + i * step; // Recompute the value
				value = outputType === "DECIMAL" ? value : Math.round(value);
				if (i >= N) break; // Prevent going out of bounds
			}

			if (i < N) {
				result.push(value); // Add the value if within bounds
			}
		}

		return result;
	}

	public generateRandomColorCodes(N: number, exclusions: string[] = []): string[] | string {
		const colorCodes: Set<string> = new Set(); // Use a Set to avoid duplicates

		while (colorCodes.size < N) {
			// Generate a random hex color code
			const randomColor = `#${Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, "0")}`;

			// Check if the generated color code is not in the exclusions
			if (!exclusions.includes(randomColor)) {
				colorCodes.add(randomColor);
			}
		}

		if (N === 1) {
			return Array.from(colorCodes)[0]; // Convert Set back to Array and return only one value
		}
		return Array.from(colorCodes).slice(); // Convert Set back to Array
	}

	public scaleValuesToRange(arr: number[], newMin: number, newMax: number): number[] {
		if (arr.length === 0) {
			return [].slice(); // Return an empty array for empty input
		}

		const oldMin = Math.min(...arr);
		const oldMax = Math.max(...arr);

		return arr
			.slice()
			.map((num) => {
				// Scale the number to the new range
				return newMin + ((num - oldMin) * (newMax - newMin)) / (oldMax - oldMin);
			})
			.slice();
	}

	public generateDateRange(startDate: Date, endDate: Date, N: number | null = null, step: "WEEK" | "MONTH" | "YEAR" | null = null): Date[] {
		const dates: Date[] = [];

		if (N !== null && N > 0) {
			// If N is provided, generate N evenly spaced dates
			const totalMilliseconds = endDate.getTime() - startDate.getTime();
			const stepSize = totalMilliseconds / (N - 1); // Calculate step size in milliseconds

			for (let i = 0; i < N; i++) {
				const currentDate = new Date(startDate.getTime() + i * stepSize);
				dates.push(currentDate);
			}
		} else if (step) {
			// If step is provided, generate dates based on the step
			let currentDate = new Date(startDate);

			while (currentDate <= endDate) {
				dates.push(new Date(currentDate)); // Push a copy of the current date

				// Increment the current date based on the step
				switch (step) {
					case "WEEK":
						currentDate.setDate(currentDate.getDate() + 7); // Add 7 days for a week
						break;
					case "MONTH":
						currentDate.setMonth(currentDate.getMonth() + 1); // Add 1 month
						break;
					case "YEAR":
						currentDate.setFullYear(currentDate.getFullYear() + 1); // Add 1 year
						break;
					default:
						throw new Error("Invalid step type. Use 'WEEK', 'MONTH', or 'YEAR'.");
				}
			}
		} else {
			throw new Error("Either N or step must be provided.");
		}

		return dates;
	}

	private _hexToRgb(hex: string): [number, number, number] {
		const hexConverted = hex.replace(/^#/, "");

		// Ensure valid hex length
		if (hexConverted.length !== 6) {
			throw new Error("Invalid hex color format. Expected format: #RRGGBB");
		}

		const bigint = parseInt(hexConverted, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		return [r, g, b];
	}

	private _rgbToHex(r: number, g: number, b: number): string {
		return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
	}

	private _calculateBrightness(rgb: [number, number, number]): number {
		// Calculate brightness using the luminance formula
		const [r, g, b] = rgb;
		return 0.299 * r + 0.587 * g + 0.114 * b;
	}

	public sortColors(colors: string[], order: "LIGHT_TO_DARK" | "DARK_TO_LIGHT"): string[] {
		// Sort colors based on brightness
		const sortedColors = colors.sort((a, b) => {
			const brightnessA = this._calculateBrightness(this._hexToRgb(a));
			const brightnessB = this._calculateBrightness(this._hexToRgb(b));

			return brightnessA - brightnessB; // Sort in ascending order
		});

		// Reverse the array if sorting from dark to light
		return order === "DARK_TO_LIGHT" ? sortedColors.reverse().slice() : sortedColors.slice();
	}

	public contrastColor(color: string): string {
		const pattern_color = "^#([A-Fa-f0-9]{6})$";
		if (!color.match(pattern_color)) {
			throw new Error("Invalid hex color format. Expected format: #RRGGBB");
		}

		const [r, g, b] = this._hexToRgb(color);

		// Calculate the complementary color
		const contrastingColor: [number, number, number] = [255 - r, 255 - g, 255 - b];

		return this._rgbToHex(...contrastingColor);
	}

	public contrastColors(colors: string[]): string[] {
		return colors.map(this.contrastColor).slice();
	}
}
