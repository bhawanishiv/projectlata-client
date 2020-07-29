import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstanceSelectComponent } from './instance-select/instance-select.component';
import { InstanceIndexComponent } from './instance-index/instance-index.component';
import { InstanceRoutingModule } from './instance-routing.module';
import { SharingModule } from '../sharing/sharing.module';
import { InstanceCreateComponent } from './instance-create/instance-create.component';
import { InstanceSettingsGeneralComponent } from './settings/instance-settings-general/instance-settings-general.component';
import { InstanceSettingsPinConfigurationComponent } from './settings/instance-settings-pin-configuration/instance-settings-pin-configuration.component';
import { InstanceSettingsIamComponent } from './settings/instance-settings-iam/instance-settings-iam.component';
import { InstanceSettingsNavComponent } from './settings/instance-settings-nav/instance-settings-nav.component';
import { InstanceNavComponent } from './instance-nav/instance-nav.component';
import { InstanceSettingsAddPinConfigurationComponent, InstanceSettingsAppPinNameComponent } from './settings/instance-settings-add-pin-configuration/instance-settings-add-pin-configuration.component';
import { InstancePinConfigurationsComponent } from './instance-pin-configuration/instance-pin-configurations.component';
import { EnergyControlModule } from '../activities/energy-control/energy-control.module';
import { InstancePinStatusComponent } from './instance-pin-status/instance-pin-status.component';
import { InstancePinCmdComponent } from './instance-pin-cmd/instance-pin-cmd.component';
import { InstanceSettingsAddIamComponent } from './settings/instance-settings-add-iam/instance-settings-add-iam.component';
import { InstanceSettingsUpdateIamComponent } from './settings/instance-settings-update-iam/instance-settings-update-iam.component';

@NgModule({
  declarations: [
    InstanceSelectComponent,
    InstanceIndexComponent,
    InstanceCreateComponent,
    InstanceSettingsGeneralComponent,
    InstanceSettingsPinConfigurationComponent,
    InstanceSettingsIamComponent,
    InstanceSettingsNavComponent,
    InstanceNavComponent,
    InstanceSettingsAddPinConfigurationComponent,
    InstancePinConfigurationsComponent,
    InstancePinStatusComponent,
    InstanceSettingsAppPinNameComponent,
    InstancePinCmdComponent,
    InstanceSettingsAddIamComponent,
    InstanceSettingsUpdateIamComponent
  ],
  imports: [
    CommonModule,
    EnergyControlModule,
    SharingModule,
    InstanceRoutingModule,
  ],
  entryComponents: [
    InstanceCreateComponent,  
    InstanceSettingsAddIamComponent,
    InstanceSettingsUpdateIamComponent,
    InstanceSettingsAppPinNameComponent
  ]
})
export class InstanceModule { }
