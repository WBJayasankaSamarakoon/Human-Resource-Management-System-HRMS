import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipmailComponent } from './slipmail.component';

describe('SlipmailComponent', () => {
  let component: SlipmailComponent;
  let fixture: ComponentFixture<SlipmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlipmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlipmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
