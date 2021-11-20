import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCampaignsComponent } from './track-campaigns.component';

describe('TrackCampaignsComponent', () => {
  let component: TrackCampaignsComponent;
  let fixture: ComponentFixture<TrackCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
