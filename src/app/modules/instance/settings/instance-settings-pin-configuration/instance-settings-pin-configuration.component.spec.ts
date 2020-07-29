import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsPinConfigurationComponent } from './instance-settings-pin-configuration.component';

describe('InstanceSettingsPinConfigurationComponent', () => {
  let component: InstanceSettingsPinConfigurationComponent;
  let fixture: ComponentFixture<InstanceSettingsPinConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsPinConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsPinConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
