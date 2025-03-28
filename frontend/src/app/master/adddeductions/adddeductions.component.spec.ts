import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddeductionsComponent } from './adddeductions.component';

describe('AdddeductionsComponent', () => {
  let component: AdddeductionsComponent;
  let fixture: ComponentFixture<AdddeductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdddeductionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
