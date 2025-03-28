import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavedayComponent } from './leaveday.component';

describe('LeavedayComponent', () => {
  let component: LeavedayComponent;
  let fixture: ComponentFixture<LeavedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavedayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
