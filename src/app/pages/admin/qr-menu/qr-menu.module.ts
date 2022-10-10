import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrMenuRoutingModule } from './qr-menu-routing.module';
import { QrMenuComponent } from './qr-menu.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    QrMenuComponent
  ],
  imports: [
    CommonModule,
    QrMenuRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class QrMenuModule { }
