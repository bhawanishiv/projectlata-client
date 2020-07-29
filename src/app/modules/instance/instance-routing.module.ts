import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstanceIndexComponent } from './instance-index/instance-index.component';
import { InstanceSelectComponent } from './instance-select/instance-select.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { InstanceSettingsGeneralComponent } from './settings/instance-settings-general/instance-settings-general.component';
import { InstanceSettingsPinConfigurationComponent } from './settings/instance-settings-pin-configuration/instance-settings-pin-configuration.component';
import { InstanceSettingsNavComponent } from './settings/instance-settings-nav/instance-settings-nav.component';
import { InstanceSettingsIamComponent } from './settings/instance-settings-iam/instance-settings-iam.component';
import { InstanceNavComponent } from './instance-nav/instance-nav.component';
import { InstancePinStatusComponent } from './instance-pin-status/instance-pin-status.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: InstanceSelectComponent },
      {
        path: ':instanceId', component: InstanceNavComponent,
        children: [
          { path: 'overview', component: InstanceIndexComponent },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          {
            path: 'status', children: [
              { path: ':pinNo', component: InstancePinStatusComponent }
            ]
          },
          {
            path: 'settings', component: InstanceSettingsNavComponent, children: [
              { path: 'general', component: InstanceSettingsGeneralComponent },
              { path: '', redirectTo: 'general', pathMatch: 'full' },
              // { path: 'iam', component: InstanceSettingsIamComponent },
              { path: 'configure', component: InstanceSettingsPinConfigurationComponent }
            ]
          }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstanceRoutingModule { }
