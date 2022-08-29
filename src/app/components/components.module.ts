import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MiniDishCardComponent } from './mini-dish-card/mini-dish-card.component';
import { MenuDishCardComponent } from './menu-dish-card/menu-dish-card.component';
import { BookedTableCardComponent } from './booked-table-card/booked-table-card.component';
import { TableCardComponent } from './table-card/table-card.component';
import { BookTableComponent } from './book-table/book-table.component';
import { MenuFeatureWidgetComponent } from './menu-feature-widget/menu-feature-widget.component';

@NgModule({
  declarations: [
    HeaderComponent,
    StatCardComponent,
    MiniDishCardComponent,
    MenuDishCardComponent,
    BookedTableCardComponent,
    TableCardComponent,
    BookTableComponent,
    MenuFeatureWidgetComponent,
  ],
  imports: [CommonModule, MatIconModule,RouterModule],
  exports: [
    HeaderComponent,
    StatCardComponent,
    MiniDishCardComponent,
    MenuDishCardComponent,
    BookedTableCardComponent,
    TableCardComponent,
    MenuFeatureWidgetComponent
  ],
})
export class ComponentsModule {}
