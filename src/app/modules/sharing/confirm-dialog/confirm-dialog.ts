import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'ngp-confirm-dialog',
    templateUrl: 'confirm-dialog.html',
})
export class NgpConfirmDialog {

    constructor(
        public dialogRef: MatDialogRef<NgpConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    confirm() {
        this.dialogRef.close(true);
    }
}