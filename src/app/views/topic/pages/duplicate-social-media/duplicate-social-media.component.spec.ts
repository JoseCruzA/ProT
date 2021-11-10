import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateSocialMediaComponent } from './duplicate-social-media.component';

describe('DuplicateSocialMediaComponent', () => {
  let component: DuplicateSocialMediaComponent;
  let fixture: ComponentFixture<DuplicateSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateSocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
