import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MiniDishCardComponent } from './mini-dish-card/mini-dish-card.component';
import { MenuDishCardComponent } from './menu-dish-card/menu-dish-card.component';
import { BookedTableCardComponent } from './booked-table-card/booked-table-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    StatCardComponent,
    MiniDishCardComponent,
    MenuDishCardComponent,
    BookedTableCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    StatCardComponent,
    MiniDishCardComponent,
    MenuDishCardComponent,
    BookedTableCardComponent
  ]
})
export class ComponentsModule { }
