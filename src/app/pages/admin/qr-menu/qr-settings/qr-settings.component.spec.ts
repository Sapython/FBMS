import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrSettingsComponent } from './qr-settings.component';

describe('QrSettingsComponent', () => {
  let component: QrSettingsComponent;
  let fixture: ComponentFixture<QrSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
