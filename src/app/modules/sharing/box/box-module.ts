import { NgpBox, NgpBoxFooter, NgpBoxContent } from './box';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgpCoreModule } from '../core/core-module';

@NgModule({
    declarations: [
        NgpBox,
        NgpBoxContent,
        NgpBoxFooter
    ],
    imports: [   
        NgpCoreModule,  
        CommonModule,
    ],
    exports: [
        NgpBox,
        NgpBoxContent,
        NgpBoxFooter
    ]
})
export class NgpBoxModule { }
