import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmsRoutingModule } from './hrms-routing.module';
import { HrmsComponent } from './hrms.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HrmsComponent
  ],
  imports: [
    CommonModule,
    HrmsRoutingModule,
    MatIconModule
  ]
})
export class HrmsModule { }
