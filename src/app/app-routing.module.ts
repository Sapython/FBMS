import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'admin',
  //   pathMatch: 'full'
  // },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  // {
  //   path: 'admin',
  //   // canActivate: [AdminGuard],
  //   loadChildren: () =>
  //     import('./pages/admin/admin.module').then((m) => m.AdminModule),
  // },
  {
    path: 'pos',
    loadChildren: () =>
      import('./pages/pos/pos.module').then((m) => m.PosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
