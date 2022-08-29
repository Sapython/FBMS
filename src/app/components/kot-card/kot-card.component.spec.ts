import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotCardComponent } from './kot-card.component';

describe('KotCardComponent', () => {
  let component: KotCardComponent;
  let fixture: ComponentFixture<KotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KotCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
