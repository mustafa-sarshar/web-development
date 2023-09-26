import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatProgressSpinnerComponent } from './mat-progress-spinner.component';

describe('MatProgressSpinnerComponent', () => {
  let component: MatProgressSpinnerComponent;
  let fixture: ComponentFixture<MatProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatProgressSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
