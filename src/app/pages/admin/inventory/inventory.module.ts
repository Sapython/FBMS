import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import {MatTabsModule} from '@angular/material/tabs'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { AnalyticsComponent } from './analytics/analytics.component'; 
import { DialogModule } from '@angular/cdk/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component'; 
import { ComponentsModule } from 'src/app/components/components.module';
import { MatDatepickerModule, MatDateSelectionModel } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    InventoryComponent,
    UpdateStockComponent,
    AddNewItemComponent,
    AnalyticsComponent,
    BalanceSheetComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    InventoryRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ]
})
export class InventoryModule { }
