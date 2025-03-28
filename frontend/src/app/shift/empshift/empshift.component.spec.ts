import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpshiftComponent } from './empshift.component';

describe('EmpshiftComponent', () => {
  let component: EmpshiftComponent;
  let fixture: ComponentFixture<EmpshiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpshiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
