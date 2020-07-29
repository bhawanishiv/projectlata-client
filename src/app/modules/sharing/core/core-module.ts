import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgpNavToBack } from './core';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        NgpNavToBack
    ],
    imports: [
        RouterModule,
        CommonModule,
    ],
    exports: [
        RouterModule,
        NgpNavToBack
    ]
})
export class NgpCoreModule { }
