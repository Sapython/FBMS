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
import { SideFlowComponent } from './side-flow/side-flow.component';
import { MenuFeatureWidgetComponent } from './menu-feature-widget/menu-feature-widget.component';
import { DropzoneDirective } from './directives/drop-zone.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

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
    SideFlowComponent,
    DropzoneDirective
  ],
  imports: [CommonModule, MatIconModule,RouterModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatMenuModule],
  exports: [
    HeaderComponent,
    StatCardComponent,
    MiniDishCardComponent,
    MenuDishCardComponent,
    BookedTableCardComponent,
    TableCardComponent,
    MenuFeatureWidgetComponent,
    SideFlowComponent,
    DropzoneDirective
  ],
})
export class ComponentsModule {}
