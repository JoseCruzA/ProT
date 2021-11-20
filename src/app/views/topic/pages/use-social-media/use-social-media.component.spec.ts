import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseSocialMediaComponent } from './use-social-media.component';

describe('UseSocialMediaComponent', () => {
  let component: UseSocialMediaComponent;
  let fixture: ComponentFixture<UseSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseSocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
