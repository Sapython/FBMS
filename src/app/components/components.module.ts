import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MiniDishCardComponent } from './mini-dish-card/mini-dish-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    StatCardComponent,
    MiniDishCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    StatCardComponent,
    MiniDishCardComponent
  ]
})
export class ComponentsModule { }
