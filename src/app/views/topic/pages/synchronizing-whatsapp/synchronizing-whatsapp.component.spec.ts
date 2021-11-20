import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchronizingWhatsappComponent } from './synchronizing-whatsapp.component';

describe('SynchronizingWhatsappComponent', () => {
  let component: SynchronizingWhatsappComponent;
  let fixture: ComponentFixture<SynchronizingWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynchronizingWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchronizingWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
