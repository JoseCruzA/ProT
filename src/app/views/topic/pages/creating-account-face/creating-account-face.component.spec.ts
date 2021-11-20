import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingAccountFaceComponent } from './creating-account-face.component';

describe('CreatingAccountFaceComponent', () => {
  let component: CreatingAccountFaceComponent;
  let fixture: ComponentFixture<CreatingAccountFaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingAccountFaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingAccountFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
