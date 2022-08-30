import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { DishesComponent } from './dishes.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogModule } from '@angular/cdk/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    DishesComponent
  ],
  imports: [
    CommonModule,
    DishesRoutingModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    ComponentsModule,
    DialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class DishesModule { }
