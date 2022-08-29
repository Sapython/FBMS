import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DineInComponent } from './dine-in.component';

const routes: Routes = [{ path: '', component: DineInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DineInRoutingModule { }
