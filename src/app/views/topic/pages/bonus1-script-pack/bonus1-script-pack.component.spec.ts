import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bonus1ScriptPackComponent } from './bonus1-script-pack.component';

describe('Bonus1ScriptPackComponent', () => {
  let component: Bonus1ScriptPackComponent;
  let fixture: ComponentFixture<Bonus1ScriptPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bonus1ScriptPackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bonus1ScriptPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
