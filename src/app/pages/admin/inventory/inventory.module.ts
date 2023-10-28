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
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card'; 
import {MatTableModule} from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { IssueSheetComponent } from './issue-sheet/issue-sheet.component';
import { HistorySheetComponent } from './history-sheet/history-sheet.component';

@NgModule({
  declarations: [
    InventoryComponent,
    UpdateStockComponent,
    AddNewItemComponent,
    AnalyticsComponent,
    BalanceSheetComponent,
    SchedulerComponent,
    IssueSheetComponent,
    HistorySheetComponent
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
    MatNativeDateModule,
    MatCardModule,
    MatTableModule,
    MatSortModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class InventoryModule { }
