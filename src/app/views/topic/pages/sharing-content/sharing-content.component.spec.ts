import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingContentComponent } from './sharing-content.component';

describe('SharingContentComponent', () => {
  let component: SharingContentComponent;
  let fixture: ComponentFixture<SharingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharingContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
