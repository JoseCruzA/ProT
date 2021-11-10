import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusInstagramComponent } from './bonus-instagram.component';

describe('BonusInstagramComponent', () => {
  let component: BonusInstagramComponent;
  let fixture: ComponentFixture<BonusInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusInstagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
