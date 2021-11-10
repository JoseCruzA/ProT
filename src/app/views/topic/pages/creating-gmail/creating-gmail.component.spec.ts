import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingGmailComponent } from './creating-gmail.component';

describe('CreatingGmailComponent', () => {
  let component: CreatingGmailComponent;
  let fixture: ComponentFixture<CreatingGmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingGmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingGmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
