import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface Permission {
  name: string;
  completed: boolean;
  allComplete: boolean;
  color: ThemePalette;
  subtasks?: Permission[];
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Output() close:EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  accessLevels: string[] = ['Admin', 'Supervisor', 'Head', 'General Manager', 'Local Manager','Staff Manager','Staff','Biller Operator','Kiosk Operator','Kitchen Operator','Waiter','Cashier','Biller'];
  ngOnInit(): void {
  }

  permissions: Permission[] = [
    {
      name: 'Biller',
      completed: false,
      color: 'primary',
      allComplete:false,
      subtasks: [
        {name: 'Edit Bill', completed: false,allComplete:false, color: 'primary'},
        {name: 'Re-Print Bill', completed: false,allComplete:false, color: 'primary'},
        {name: 'Edit KOT', completed: false,allComplete:false, color: 'primary'},
        {name: 'Cancel Kot', completed: false,allComplete:false, color: 'primary'},
        {name: 'Delete Kot', completed: false,allComplete:false, color: 'primary'},
        {name: 'Discount', completed: false,allComplete:false, color: 'primary'},
        {name: 'Line Discount', completed: false,allComplete:false, color: 'primary'},
      ],
    },
    {
      name: 'Inventory',
      completed: false,
      color: 'primary',
      allComplete:false,
      subtasks: [
        {name: 'Edit Balance Sheet', completed: false,allComplete:false, color: 'primary'},
        {name: 'Purchase Items', completed: false,allComplete:false, color: 'primary'},
        {name: 'Change Stock Quantity', completed: false,allComplete:false, color: 'primary'},
        {name: 'See History', completed: false,allComplete:false, color: 'primary'},
        {name: 'Set Closing Balance', completed: false,allComplete:false, color: 'primary'},
        {name: 'Set Issue', completed: false,allComplete:false, color: 'primary'},
      ],
    },
    {
      name: 'CRMS',
      completed: false,
      color: 'primary',
      allComplete:false,
      subtasks: [
        {name: 'Edit Customer Database', completed: false,allComplete:false, color: 'primary'},
        {name: 'Manage Channels', completed: false,allComplete:false, color: 'primary'},
        {name: 'Create Automation', completed: false,allComplete:false, color: 'primary'},
        {name: 'Send Messages', completed: false,allComplete:false, color: 'primary'},
        {name: 'Manage Messages', completed: false,allComplete:false, color: 'primary'},
        {name: 'Manage Reviews', completed: false,allComplete:false, color: 'primary'},
        {name: 'Manage Social Profiles', completed: false,allComplete:false, color: 'primary'},
        {name: 'Manage Crawlers', completed: false,allComplete:false, color: 'primary'},
        {name: 'Import & Export Data', completed: false,allComplete:false, color: 'primary'},
      ],
    },
  ];

  allComplete: boolean = false;

  updateAllComplete(index:number) {
    // this.allComplete = this.permissions.subtasks != null && this.permissions.subtasks.every(t => t.completed);
    this.permissions[index].allComplete = this.permissions[index].subtasks != null && this.permissions[index].subtasks!.every(t => t.completed);
  }

  someComplete(index:number): boolean {
    if (this.permissions[index].subtasks == null) {
      return false;
    }
    return this.permissions[index].subtasks!.filter(t => t.completed).length > 0 && !this.permissions[index].allComplete;
  }

  setAll(completed: boolean,index:number) {
    // this.allComplete = completed;
    // if (this.permissions.subtasks == null) {
    //   return;
    // }
    // this.permissions.subtasks.forEach(t => (t.completed = completed));
    this.permissions[index].allComplete = completed;
    if (this.permissions[index].subtasks == null) {
      return;
    }
    this.permissions[index].subtasks!.forEach(t => (t.completed = completed));
  }
}
