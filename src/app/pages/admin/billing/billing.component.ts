import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  currentBill: any;
  today: Date = new Date();
  bills: any[] = [];
  taxableValue: number = 0;
  totalQuantity: number = 0;
  totalTaxAmount: number = 0;
  subTotal: number = 0;
  constructor(
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    public dataProvider: DataProvider,
    private dialog:Dialog
  ) {}
  customers: any[] = [];
  cancelledBills: any[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });
  ngOnInit(): void {
    this.getCustomers();
    this.getCancelledBills();
    this.range.valueChanges.subscribe((value) => {
      if (value.start && value.end) {
        if (value.start?.getTime() == value.end?.getTime()) {
          value.end?.setHours(24);
        }
        this.getBills(value.start, value.end);
      }
    });
  }
  joinByComma(kotTokens?: any[]) {
    // console.log("kotTokens",kotTokens)
    if (kotTokens) {
      let res = '';
      kotTokens.forEach((token: any) => {
        res = res + token + ',  ';
      });
      return res.slice(0, -1);
    }
    return '';
  }
  toFixedValue(value: number) {
    if (value) {
      return value.toFixed(2);
    }
    return '0.00';
  }
  getCustomers() {
    this.databaseService.getCustomers().subscribe((docs: any[]) => {
      this.customers = [];
      docs.forEach((doc: any) => {
        // console.log("savedBills",doc.data())
        this.customers.push({ ...doc.data(), id: doc.id });
      });
    });
  }

  getBills(start: Date, end: Date) {
    this.databaseService
      .getCompletedBills(start, end)
      .subscribe((docs: any) => {
        this.bills = [];
        docs.forEach((element: any) => {
          this.bills.push({ ...element.data(), id: element.id });
          console.log('bills', this.bills);
        });
      });
  }

  getCancelledBills() {
    this.databaseService.getCancelledBills().subscribe((docs) => {
      this.cancelledBills = [];
      docs.forEach((doc: any) => {
        this.cancelledBills.push({ ...doc.data(), id: doc.id });
      });
    });
  }

}