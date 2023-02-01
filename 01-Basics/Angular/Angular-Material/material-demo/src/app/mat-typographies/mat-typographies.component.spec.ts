import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTypographiesComponent } from './mat-typographies.component';

describe('MatTypographiesComponent', () => {
  let component: MatTypographiesComponent;
  let fixture: ComponentFixture<MatTypographiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTypographiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTypographiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
