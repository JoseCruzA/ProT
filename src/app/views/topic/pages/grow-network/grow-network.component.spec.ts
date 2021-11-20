import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowNetworkComponent } from './grow-network.component';

describe('GrowNetworkComponent', () => {
  let component: GrowNetworkComponent;
  let fixture: ComponentFixture<GrowNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
