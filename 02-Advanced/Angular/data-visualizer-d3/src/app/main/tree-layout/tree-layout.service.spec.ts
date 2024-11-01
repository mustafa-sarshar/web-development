import { TestBed } from "@angular/core/testing";

import { TreeLayoutService } from "./tree-layout.service";

describe("TreeLayoutService", () => {
	let service: TreeLayoutService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TreeLayoutService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
