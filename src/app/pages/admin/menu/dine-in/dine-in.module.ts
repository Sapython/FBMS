import { ComponentsModule } from './../../../../components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DineInRoutingModule } from './dine-in-routing.module';
import { DineInComponent } from './dine-in.component';
import {MatTabsModule} from '@angular/material/tabs'; 


@NgModule({
  declarations: [
    DineInComponent
  ],
  imports: [
    CommonModule,
    DineInRoutingModule,
    MatTabsModule,
    MatIconModule,
    ComponentsModule
  ]
})
export class DineInModule { }
