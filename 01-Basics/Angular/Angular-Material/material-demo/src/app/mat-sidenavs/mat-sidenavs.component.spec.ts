import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatSidenavsComponent } from "./mat-sidenavs.component";

describe("MatSidenavsComponent", () => {
  let component: MatSidenavsComponent;
  let fixture: ComponentFixture<MatSidenavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatSidenavsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatSidenavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
