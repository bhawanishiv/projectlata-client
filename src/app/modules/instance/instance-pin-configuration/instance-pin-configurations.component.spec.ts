import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancePinConfigurationsComponent } from './instance-pin-configurations.component';

describe('InstancePinConfigurationComponent', () => {
  let component: InstancePinConfigurationsComponent;
  let fixture: ComponentFixture<InstancePinConfigurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancePinConfigurationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancePinConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
