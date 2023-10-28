import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(public dataProvider: DataProvider) {}
  links: any[] = [
    {
      link: '/admin/dashboard',
      icon: 'dashboard',
      title: 'Dashboard',
      toggled: false,
    },
    {
      link: '/admin/inventory',
      icon: 'inventory',
      title: 'Inventory',
      toggled: false,
      subLinks: [
        {
          link: '/admin/variables',
          icon: 'tune',
          title: 'Variables',
          toggled: false,
        },
        {
          link: '/admin/inventory',
          icon: 'inventory',
          title: 'Inventory',
          toggled: false,
        },
      ],
    },
    {
      link: '/admin/',
      icon: 'storefront',
      title: 'Storefront',
      toggled: false,
      subLinks: [
        {
          link: '/admin/tables',
          icon: 'table_restaurant',
          title: 'Tables',
          toggled: false,
        },
        {
          link: '/admin/rooms',
          icon: 'king_bed',
          title: 'Rooms',
          toggled: false,
        },
        {
          link: '/admin/events',
          icon: 'event',
          title: 'Events',
          toggled: false,
        },
      ],
    },
    {
      link: '/admin/menu',
      icon: 'menu_book',
      title: 'Menu',
      toggled: false,
      subLinks: [
        {
          link: '/admin/qrmenu',
          icon: 'qr_code',
          title: 'Qr Menu',
          toggled: false,
        },
      ],
    },
    {
      link: '/admin/reports',
      icon: 'insights',
      title: 'Reports',
      toggled: false,
      subLinks: [
        {
          link: '/admin/orders',
          icon: 'receipt_long',
          title: 'Orders',
          toggled: false,
        },
        {
          link: '/admin/billing',
          icon: 'payments',
          title: 'Billing & Payment',
          toggled: false,
        },
        {
          link: '/admin/reports',
          icon: 'insights',
          title: 'Reports',
          toggled: false,
        },
      ],
    },
    {
      link: '/admin/customers',
      icon: 'groups',
      title: 'Customers',
      toggled: false,
      subLinks: [
        {
          link: '/admin/customers',
          icon: 'groups',
          title: 'Customers',
          toggled: false,
        },
        {
          link: '/admin/feedback',
          icon: 'reviews',
          title: 'Feedback & Reviews',
          toggled: false,
        },
      ],
    },
    {
      link: '/admin/settings',
      icon: 'settings',
      title: 'Settings',
      toggled: false,
      subLinks: [
        {
          link: '/admin/settings',
          icon: 'settings',
          title: 'Settings',
          toggled: false,
        },
        {
          link: '/admin/permissions',
          icon: 'group',
          title: 'Permissions',
          toggled: false,
        },
      ],
    },
  ];
  ngOnInit(): void {}

  validPath() {
    console.log('window.location.pathname', window.location.pathname);
    return true;
  }
}
