import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSendDirectTrafficComponent } from './campaign-send-direct-traffic.component';

describe('CampaignSendDirectTrafficComponent', () => {
  let component: CampaignSendDirectTrafficComponent;
  let fixture: ComponentFixture<CampaignSendDirectTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignSendDirectTrafficComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSendDirectTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
