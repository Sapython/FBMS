import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrMenuRoutingModule } from './qr-menu-routing.module';
import { QrMenuComponent } from './qr-menu.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QrSettingsComponent } from './qr-settings/qr-settings.component'; 
import { DialogModule } from '@angular/cdk/dialog';
import { QrCodesComponent } from './qr-codes/qr-codes.component';

@NgModule({
  declarations: [
    QrMenuComponent,
    QrSettingsComponent,
    QrCodesComponent
  ],
  imports: [
    CommonModule,
    QrMenuRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    DialogModule
  ]
})
export class QrMenuModule { }
