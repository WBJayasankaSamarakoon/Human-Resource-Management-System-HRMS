import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrecordComponent } from './adrecord.component';

describe('AdrecordComponent', () => {
  let component: AdrecordComponent;
  let fixture: ComponentFixture<AdrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdrecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
