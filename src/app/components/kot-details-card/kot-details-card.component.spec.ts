import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotDetailsCardComponent } from './kot-details-card.component';

describe('KotDetailsCardComponent', () => {
  let component: KotDetailsCardComponent;
  let fixture: ComponentFixture<KotDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KotDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KotDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
