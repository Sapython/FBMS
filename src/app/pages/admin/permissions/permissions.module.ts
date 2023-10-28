import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SettingsComponent } from './settings/settings.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewUserComponent } from './new-user/new-user.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    PermissionsComponent,
    SettingsComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class PermissionsModule { }
