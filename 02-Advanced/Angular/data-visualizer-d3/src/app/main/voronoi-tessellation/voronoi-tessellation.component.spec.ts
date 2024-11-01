import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoronoiTessellationComponent } from './voronoi-tessellation.component';

describe('VoronoiTessellationComponent', () => {
  let component: VoronoiTessellationComponent;
  let fixture: ComponentFixture<VoronoiTessellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoronoiTessellationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoronoiTessellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
