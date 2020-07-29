import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgpCoreModule } from '../core/core-module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgpConfirmDialog } from './confirm-dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        NgpConfirmDialog

    ],
    imports: [
        NgpCoreModule,
        MatButtonModule,
        MatDialogModule,
        CommonModule,
    ],
    exports: [
        NgpConfirmDialog
    ],
    entryComponents: [NgpConfirmDialog]
})
export class NgpConfirmDialogModule { }
