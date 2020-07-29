import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgpUserAvatar } from './user-avatar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        NgpUserAvatar
    ],
    imports: [
        CommonModule,
        MatIconModule,
    ],
    exports: [
        NgpUserAvatar
    ],
})
export class NgpUserAvatarModule { }
