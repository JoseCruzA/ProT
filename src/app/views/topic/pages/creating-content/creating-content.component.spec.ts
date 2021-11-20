import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingContentComponent } from './creating-content.component';

describe('CreatingContentComponent', () => {
  let component: CreatingContentComponent;
  let fixture: ComponentFixture<CreatingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
