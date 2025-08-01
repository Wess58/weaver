import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrIframeComponent } from './vr-iframe.component';

describe('VrIframeComponent', () => {
  let component: VrIframeComponent;
  let fixture: ComponentFixture<VrIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VrIframeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VrIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
