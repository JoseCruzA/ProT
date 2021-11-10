import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingInstagramComponent } from './creating-instagram.component';

describe('CreatingInstagramComponent', () => {
  let component: CreatingInstagramComponent;
  let fixture: ComponentFixture<CreatingInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingInstagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
