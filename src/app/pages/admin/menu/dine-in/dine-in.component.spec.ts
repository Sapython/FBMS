import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DineInComponent } from './dine-in.component';

describe('DineInComponent', () => {
  let component: DineInComponent;
  let fixture: ComponentFixture<DineInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DineInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DineInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
