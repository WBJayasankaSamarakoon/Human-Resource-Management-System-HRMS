import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YeareportComponent } from './yeareport.component';

describe('YeareportComponent', () => {
  let component: YeareportComponent;
  let fixture: ComponentFixture<YeareportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YeareportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YeareportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
