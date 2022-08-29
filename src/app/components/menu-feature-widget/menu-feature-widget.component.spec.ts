import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFeatureWidgetComponent } from './menu-feature-widget.component';

describe('MenuFeatureWidgetComponent', () => {
  let component: MenuFeatureWidgetComponent;
  let fixture: ComponentFixture<MenuFeatureWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFeatureWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFeatureWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
