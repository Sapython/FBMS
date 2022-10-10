import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrMenuComponent } from './qr-menu.component';

const routes: Routes = [{ path: '', component: QrMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrMenuRoutingModule { }
