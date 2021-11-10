import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingAdvertiserAccountComponent } from './using-advertiser-account.component';

describe('UsingAdvertiserAccountComponent', () => {
  let component: UsingAdvertiserAccountComponent;
  let fixture: ComponentFixture<UsingAdvertiserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsingAdvertiserAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingAdvertiserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
