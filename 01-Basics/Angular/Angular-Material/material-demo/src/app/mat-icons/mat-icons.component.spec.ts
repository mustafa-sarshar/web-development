import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconsComponent } from './mat-icons.component';

describe('MatIconsComponent', () => {
  let component: MatIconsComponent;
  let fixture: ComponentFixture<MatIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatIconsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
