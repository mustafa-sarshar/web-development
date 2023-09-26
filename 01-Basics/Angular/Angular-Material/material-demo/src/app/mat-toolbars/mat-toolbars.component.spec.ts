import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatToolbarsComponent } from "./mat-toolbars.component";

describe("MatToolbarsComponent", () => {
  let component: MatToolbarsComponent;
  let fixture: ComponentFixture<MatToolbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatToolbarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatToolbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
