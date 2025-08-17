import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MusicPlayerTechnoComponent } from "./music-player-techno.component";

describe("MusicPlayerTechnoComponent", () => {
  let component: MusicPlayerTechnoComponent;
  let fixture: ComponentFixture<MusicPlayerTechnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicPlayerTechnoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicPlayerTechnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
