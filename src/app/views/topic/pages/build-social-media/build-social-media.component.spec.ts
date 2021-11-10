import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSocialMediaComponent } from './build-social-media.component';

describe('BuildSocialMediaComponent', () => {
  let component: BuildSocialMediaComponent;
  let fixture: ComponentFixture<BuildSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildSocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
