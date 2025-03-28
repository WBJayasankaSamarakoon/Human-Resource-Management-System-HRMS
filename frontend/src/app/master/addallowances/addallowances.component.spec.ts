import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddallowancesComponent } from './addallowances.component';

describe('AddallowancesComponent', () => {
  let component: AddallowancesComponent;
  let fixture: ComponentFixture<AddallowancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddallowancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddallowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
