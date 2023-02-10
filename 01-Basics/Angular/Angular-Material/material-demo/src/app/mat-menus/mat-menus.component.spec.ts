import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMenusComponent } from './mat-menus.component';

describe('MatMenusComponent', () => {
  let component: MatMenusComponent;
  let fixture: ComponentFixture<MatMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
