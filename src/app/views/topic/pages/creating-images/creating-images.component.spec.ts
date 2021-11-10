import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingImagesComponent } from './creating-images.component';

describe('CreatingImagesComponent', () => {
  let component: CreatingImagesComponent;
  let fixture: ComponentFixture<CreatingImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
