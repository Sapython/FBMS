import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./inventory/inventory.module').then((m) => m.InventoryModule),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./event/event.module').then((m) => m.EventModule),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('./billing/billing.module').then((m) => m.BillingModule),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: 'hrms',
        loadChildren: () =>
          import('./hrms/hrms.module').then((m) => m.HrmsModule),
      },
      {
        path: 'vendors',
        loadChildren: () =>
          import('./vendor/vendor.module').then((m) => m.VendorModule),
      },
      {
        path: 'housekeeping',
        loadChildren: () =>
          import('./housekeeping/housekeeping.module').then(
            (m) => m.HousekeepingModule
          ),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./feedback/feedback.module').then((m) => m.FeedbackModule),
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('./rooms/rooms.module').then((m) => m.RoomsModule),
      },
      { path: 'reports', loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule) },
      { path: 'qrmenu', loadChildren: () => import('./qr-menu/qr-menu.module').then(m => m.QrMenuModule) },
      { path: 'roomReports', loadChildren: () => import('./room-reporting/room-reporting.module').then(m => m.RoomReportingModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'permissions', loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule) },
      { path: 'variables', loadChildren: () => import('./variables/variables.module').then(m => m.VariablesModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
