import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { TableRoutingModule } from '../table/table-routing.module';


@NgModule({
  declarations: [
    RoomsComponent,
    AddRoomsComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatInputModule,
    ComponentsModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class RoomsModule { }
