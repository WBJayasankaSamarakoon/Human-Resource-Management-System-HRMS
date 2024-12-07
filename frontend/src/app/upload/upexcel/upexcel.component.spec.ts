import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpexcelComponent } from './upexcel.component';

describe('UpexcelComponent', () => {
  let component: UpexcelComponent;
  let fixture: ComponentFixture<UpexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpexcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
