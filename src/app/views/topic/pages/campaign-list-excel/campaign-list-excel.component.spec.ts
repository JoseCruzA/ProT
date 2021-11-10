import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignListExcelComponent } from './campaign-list-excel.component';

describe('CampaignListExcelComponent', () => {
  let component: CampaignListExcelComponent;
  let fixture: ComponentFixture<CampaignListExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignListExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignListExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
