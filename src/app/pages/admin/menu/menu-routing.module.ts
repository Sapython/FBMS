import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/mangement.component';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'dine-in', loadChildren: () => import('./dine-in/dine-in.module').then(m => m.DineInModule) },
  { path: 'management', component: ManagementComponent },
  { path: ':dish', loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule) },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
