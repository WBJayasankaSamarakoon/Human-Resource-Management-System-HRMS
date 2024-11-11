import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeComponent } from './typeleave.component';

describe('TypeleaveComponent', () => {
  let component: LeaveTypeComponent;
  let fixture: ComponentFixture<LeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
