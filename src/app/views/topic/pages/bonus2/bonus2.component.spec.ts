import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bonus2Component } from './bonus2.component';

describe('Bonus2Component', () => {
  let component: Bonus2Component;
  let fixture: ComponentFixture<Bonus2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bonus2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bonus2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
