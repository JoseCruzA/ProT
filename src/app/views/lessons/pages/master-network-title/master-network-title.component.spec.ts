import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNetworkTitleComponent } from './master-network-title.component';

describe('MasterNetworkTitleComponent', () => {
  let component: MasterNetworkTitleComponent;
  let fixture: ComponentFixture<MasterNetworkTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterNetworkTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNetworkTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
