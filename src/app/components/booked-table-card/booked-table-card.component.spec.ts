import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTableCardComponent } from './booked-table-card.component';

describe('BookedTableCardComponent', () => {
  let component: BookedTableCardComponent;
  let fixture: ComponentFixture<BookedTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedTableCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
