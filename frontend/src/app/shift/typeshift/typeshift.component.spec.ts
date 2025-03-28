import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeshiftComponent } from './typeshift.component';

describe('TypeshiftComponent', () => {
  let component: TypeshiftComponent;
  let fixture: ComponentFixture<TypeshiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeshiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
