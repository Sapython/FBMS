import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReportingComponent } from './room-reporting.component';

describe('RoomReportingComponent', () => {
  let component: RoomReportingComponent;
  let fixture: ComponentFixture<RoomReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomReportingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
