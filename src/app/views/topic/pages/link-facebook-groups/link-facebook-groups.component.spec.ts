import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkFacebookGroupsComponent } from './link-facebook-groups.component';

describe('LinkFacebookGroupsComponent', () => {
  let component: LinkFacebookGroupsComponent;
  let fixture: ComponentFixture<LinkFacebookGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkFacebookGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkFacebookGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
