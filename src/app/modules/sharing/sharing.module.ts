import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { NgPButton } from './button/button';
import { NgpBoxModule } from './box/box-module';
import { NgpCoreModule } from './core/core-module';
import { NgpInputModule } from './form/input/input-module';
import { NgpIconModule } from './icon/icon-module';
import { NgpConfirmDialogModule } from './confirm-dialog/confirm-dialog-module';
import { NgpUserAvatarModule, } from './user-avatar/user-avatar-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    BasicLayoutComponent,
    NgPButton
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgpBoxModule,
    NgpCoreModule,
    NgpInputModule,
    NgpIconModule,
    NgpConfirmDialogModule,
    NgpUserAvatarModule,
    RouterModule,


    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    DragDropModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgpBoxModule,
    NgpCoreModule,
    NgpInputModule,
    NgpIconModule,
    BasicLayoutComponent,
    NgPButton,
    NgpUserAvatarModule,

    MatCardModule, //Angular Material starts
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    DragDropModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ]
})
export class SharingModule { }
