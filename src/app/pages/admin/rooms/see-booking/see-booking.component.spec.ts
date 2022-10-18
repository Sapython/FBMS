import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeBookingComponent } from './see-booking.component';

describe('SeeBookingComponent', () => {
  let component: SeeBookingComponent;
  let fixture: ComponentFixture<SeeBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
