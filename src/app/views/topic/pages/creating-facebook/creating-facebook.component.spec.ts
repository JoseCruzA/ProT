import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingFacebookComponent } from './creating-facebook.component';

describe('CreatingFacebookComponent', () => {
  let component: CreatingFacebookComponent;
  let fixture: ComponentFixture<CreatingFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingFacebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
