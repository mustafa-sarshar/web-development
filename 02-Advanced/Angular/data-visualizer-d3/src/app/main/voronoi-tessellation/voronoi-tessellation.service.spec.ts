import { TestBed } from "@angular/core/testing";

import { VoronoiTessellationService } from "./voronoi-tessellation.service";

describe("VoronoiTessellationService", () => {
	let service: VoronoiTessellationService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(VoronoiTessellationService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
