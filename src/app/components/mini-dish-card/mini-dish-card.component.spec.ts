import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDishCardComponent } from './mini-dish-card.component';

describe('MiniDishCardComponent', () => {
  let component: MiniDishCardComponent;
  let fixture: ComponentFixture<MiniDishCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniDishCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniDishCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
