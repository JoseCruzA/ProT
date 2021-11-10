import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSendPeopleComponent } from './campaign-send-people.component';

describe('CampaignSendPeopleComponent', () => {
  let component: CampaignSendPeopleComponent;
  let fixture: ComponentFixture<CampaignSendPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignSendPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSendPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
