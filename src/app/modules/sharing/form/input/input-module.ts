import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgpCoreModule } from '../../core/core-module';
import { NgpInput, NgpLabel, NgpForm } from './input';

@NgModule({
    declarations: [
        NgpInput, NgpLabel, NgpForm
    ],
    imports: [
        NgpCoreModule,
        CommonModule,
    ],
    exports: [
        NgpInput, NgpLabel,NgpForm
    ]
})
export class NgpInputModule { }
