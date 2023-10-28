import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueSheetComponent } from './issue-sheet.component';

describe('IssueSheetComponent', () => {
  let component: IssueSheetComponent;
  let fixture: ComponentFixture<IssueSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
