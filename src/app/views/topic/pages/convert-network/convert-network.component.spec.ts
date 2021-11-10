import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertNetworkComponent } from './convert-network.component';

describe('ConvertNetworkComponent', () => {
  let component: ConvertNetworkComponent;
  let fixture: ComponentFixture<ConvertNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
