import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bonus3SellingPromotingComponent } from './bonus3-selling-promoting.component';

describe('Bonus3SellingPromotingComponent', () => {
  let component: Bonus3SellingPromotingComponent;
  let fixture: ComponentFixture<Bonus3SellingPromotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bonus3SellingPromotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bonus3SellingPromotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
