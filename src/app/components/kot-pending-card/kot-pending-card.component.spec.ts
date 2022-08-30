import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotPendingCardComponent } from './kot-pending-card.component';

describe('KotPendingCardComponent', () => {
  let component: KotPendingCardComponent;
  let fixture: ComponentFixture<KotPendingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KotPendingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KotPendingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
