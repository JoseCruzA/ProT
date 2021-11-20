import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsPromoteBusinessComponent } from './campaigns-promote-business.component';

describe('CampaignsPromoteBusinessComponent', () => {
  let component: CampaignsPromoteBusinessComponent;
  let fixture: ComponentFixture<CampaignsPromoteBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignsPromoteBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsPromoteBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
