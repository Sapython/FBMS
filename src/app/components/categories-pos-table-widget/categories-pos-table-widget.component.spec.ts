import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPosTableWidgetComponent } from './categories-pos-table-widget.component';

describe('CategoriesPosTableWidgetComponent', () => {
  let component: CategoriesPosTableWidgetComponent;
  let fixture: ComponentFixture<CategoriesPosTableWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesPosTableWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesPosTableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
