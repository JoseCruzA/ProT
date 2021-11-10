import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingTextsComponent } from './creating-texts.component';

describe('CreatingTextsComponent', () => {
  let component: CreatingTextsComponent;
  let fixture: ComponentFixture<CreatingTextsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingTextsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
