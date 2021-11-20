import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordResearchComponent } from './keyword-research.component';

describe('KeywordResearchComponent', () => {
  let component: KeywordResearchComponent;
  let fixture: ComponentFixture<KeywordResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
