import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowancesComponent } from './allowances.component';

describe('AllowancesComponent', () => {
  let component: AllowancesComponent;
  let fixture: ComponentFixture<AllowancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllowancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
