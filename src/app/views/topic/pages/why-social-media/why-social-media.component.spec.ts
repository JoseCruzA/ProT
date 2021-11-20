import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhySocialMediaComponent } from './why-social-media.component';

describe('WhySocialMediaComponent', () => {
  let component: WhySocialMediaComponent;
  let fixture: ComponentFixture<WhySocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhySocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhySocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
