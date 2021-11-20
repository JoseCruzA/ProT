import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalPropectionTitleComponent } from './digital-propection-title.component';

describe('DigitalPropectionTitleComponent', () => {
  let component: DigitalPropectionTitleComponent;
  let fixture: ComponentFixture<DigitalPropectionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalPropectionTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalPropectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
