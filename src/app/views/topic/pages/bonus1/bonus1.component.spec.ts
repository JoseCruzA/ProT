import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bonus1Component } from './bonus1.component';

describe('Bonus1Component', () => {
  let component: Bonus1Component;
  let fixture: ComponentFixture<Bonus1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bonus1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bonus1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
