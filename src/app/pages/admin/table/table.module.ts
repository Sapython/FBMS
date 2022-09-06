import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddTableComponent } from './add-table/add-table.component';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [TableComponent, AddTableComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
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
  ],
})
export class TableModule {}
