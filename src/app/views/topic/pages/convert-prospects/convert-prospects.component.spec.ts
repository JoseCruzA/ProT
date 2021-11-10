import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertProspectsComponent } from './convert-prospects.component';

describe('ConvertProspectsComponent', () => {
  let component: ConvertProspectsComponent;
  let fixture: ComponentFixture<ConvertProspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertProspectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
