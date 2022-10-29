import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomReportingComponent } from './room-reporting.component';

const routes: Routes = [{ path: '', component: RoomReportingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomReportingRoutingModule { }
