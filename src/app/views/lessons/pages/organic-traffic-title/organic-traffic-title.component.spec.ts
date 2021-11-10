import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicTrafficTitleComponent } from './organic-traffic-title.component';

describe('OrganicTrafficTitleComponent', () => {
  let component: OrganicTrafficTitleComponent;
  let fixture: ComponentFixture<OrganicTrafficTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganicTrafficTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicTrafficTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
