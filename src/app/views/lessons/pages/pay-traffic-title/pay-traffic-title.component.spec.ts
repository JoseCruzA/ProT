import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTrafficTitleComponent } from './pay-traffic-title.component';

describe('PayTrafficTitleComponent', () => {
  let component: PayTrafficTitleComponent;
  let fixture: ComponentFixture<PayTrafficTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayTrafficTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTrafficTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
