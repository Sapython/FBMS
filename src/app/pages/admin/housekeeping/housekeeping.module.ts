import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousekeepingRoutingModule } from './housekeeping-routing.module';
import { HousekeepingComponent } from './housekeeping.component';


@NgModule({
  declarations: [
    HousekeepingComponent
  ],
  imports: [
    CommonModule,
    HousekeepingRoutingModule
  ]
})
export class HousekeepingModule { }
