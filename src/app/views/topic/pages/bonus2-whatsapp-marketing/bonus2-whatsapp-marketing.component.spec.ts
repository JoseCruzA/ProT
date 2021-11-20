import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bonus2WhatsappMarketingComponent } from './bonus2-whatsapp-marketing.component';

describe('Bonus2WhatsappMarketingComponent', () => {
  let component: Bonus2WhatsappMarketingComponent;
  let fixture: ComponentFixture<Bonus2WhatsappMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bonus2WhatsappMarketingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bonus2WhatsappMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
