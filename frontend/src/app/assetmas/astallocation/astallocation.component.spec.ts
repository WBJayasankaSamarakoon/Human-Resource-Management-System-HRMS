import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstallocationComponent } from './astallocation.component';

describe('AstallocationComponent', () => {
  let component: AstallocationComponent;
  let fixture: ComponentFixture<AstallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstallocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
