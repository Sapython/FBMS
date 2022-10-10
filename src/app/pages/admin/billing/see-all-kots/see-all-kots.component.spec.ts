import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllKotsComponent } from './see-all-kots.component';

describe('SeeAllKotsComponent', () => {
  let component: SeeAllKotsComponent;
  let fixture: ComponentFixture<SeeAllKotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAllKotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllKotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
