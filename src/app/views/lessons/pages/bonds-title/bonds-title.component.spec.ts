import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsTitleComponent } from './bonds-title.component';

describe('BondsTitleComponent', () => {
  let component: BondsTitleComponent;
  let fixture: ComponentFixture<BondsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondsTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
