import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'dine-in', loadChildren: () => import('./dine-in/dine-in.module').then(m => m.DineInModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
