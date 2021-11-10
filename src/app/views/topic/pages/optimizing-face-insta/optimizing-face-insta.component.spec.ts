import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizingFaceInstaComponent } from './optimizing-face-insta.component';

describe('OptimizingFaceInstaComponent', () => {
  let component: OptimizingFaceInstaComponent;
  let fixture: ComponentFixture<OptimizingFaceInstaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptimizingFaceInstaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizingFaceInstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
