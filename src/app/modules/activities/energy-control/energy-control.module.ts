import { NgModule } from '@angular/core';
import { EnergyControlStatusComponent } from './energy-control-status/energy-control-status.component';
import { SharingModule } from '../../sharing/sharing.module';
import { EnergyControlPinStatusComponent } from './energy-control-pin-status/energy-control-pin-status.component';

@NgModule({
    declarations: [
        EnergyControlStatusComponent,
        EnergyControlPinStatusComponent
    ],
    imports: [
        SharingModule,
    ],
    exports: [
        EnergyControlStatusComponent,
        EnergyControlPinStatusComponent
    ],
})
export class EnergyControlModule {

}