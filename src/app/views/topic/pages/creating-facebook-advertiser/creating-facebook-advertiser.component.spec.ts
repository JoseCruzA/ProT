import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingFacebookAdvertiserComponent } from './creating-facebook-advertiser.component';

describe('CreatingFacebookAdvertiserComponent', () => {
  let component: CreatingFacebookAdvertiserComponent;
  let fixture: ComponentFixture<CreatingFacebookAdvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingFacebookAdvertiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingFacebookAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
