import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivelyClosingPageComponent } from './effectively-closing-page.component';

describe('EffectivelyClosingPageComponent', () => {
  let component: EffectivelyClosingPageComponent;
  let fixture: ComponentFixture<EffectivelyClosingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffectivelyClosingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectivelyClosingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
