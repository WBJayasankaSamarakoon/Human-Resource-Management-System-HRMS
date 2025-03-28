import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftlineComponent } from './shiftline.component';

describe('ShiftlineComponent', () => {
  let component: ShiftlineComponent;
  let fixture: ComponentFixture<ShiftlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
