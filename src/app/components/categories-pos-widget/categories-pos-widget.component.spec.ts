import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPosWidgetComponent } from './categories-pos-widget.component';

describe('CategoriesPosWidgetComponent', () => {
  let component: CategoriesPosWidgetComponent;
  let fixture: ComponentFixture<CategoriesPosWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesPosWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesPosWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
