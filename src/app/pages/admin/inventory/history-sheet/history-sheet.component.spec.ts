import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySheetComponent } from './history-sheet.component';

describe('HistorySheetComponent', () => {
  let component: HistorySheetComponent;
  let fixture: ComponentFixture<HistorySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
