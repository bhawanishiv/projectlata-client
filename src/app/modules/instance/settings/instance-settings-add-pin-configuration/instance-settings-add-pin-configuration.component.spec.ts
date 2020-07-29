import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsAddPinConfigurationComponent } from './instance-settings-add-pin-configuration.component';

describe('InstanceSettingsAddPinConfigurationComponent', () => {
  let component: InstanceSettingsAddPinConfigurationComponent;
  let fixture: ComponentFixture<InstanceSettingsAddPinConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsAddPinConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsAddPinConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
