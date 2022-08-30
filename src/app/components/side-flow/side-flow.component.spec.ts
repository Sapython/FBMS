import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideFlowComponent } from './side-flow.component';

describe('SideFlowComponent', () => {
  let component: SideFlowComponent;
  let fixture: ComponentFixture<SideFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
