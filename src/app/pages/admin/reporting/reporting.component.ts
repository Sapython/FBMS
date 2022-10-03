import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
})
export class ReportingComponent implements OnInit {
  constructor(private databaseService: DatabaseService) {}
  bills: any[] = [];
  itemWiseReport: any[] = [];
  allDishes: any[] = [];
  saleWiseReport: any[] = [];
  totalReports: any;
  range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });
  ngOnInit(): void {
    this.range.valueChanges.subscribe((value) => {
      if (value.start && value.end) {
        if (value.start?.getTime() == value.end?.getTime()) {
          value.end?.setHours(23);
          value.end?.setMinutes(59);
          value.end?.setSeconds(59);
        }
        this.databaseService
          .getAllBills(value.start, value.end)
          .then((data) => {
            data.forEach((bill) => {
              if (bill.data()['settled'] == true) {
                this.bills.push(bill.data());
              }
            });
            console.log('this.bills', this.bills);
            // add all dishes
            this.bills.forEach((bill) => {
              bill.kots.forEach((kot: any) => {
                kot.products.forEach((product: any) => {
                  // this.allDishes.push(product)
                  // find id the dish exists increase the quantity
                  let index = this.allDishes.findIndex(
                    (dish) => dish.id == product.id
                  );
                  if (index == -1) {
                    this.allDishes.push({
                      ...product,
                      billNo: bill.billNo,
                      billId: bill.id,
                      sales: 1,
                    });
                  } else {
                    this.allDishes[index].quantity += product.quantity;
                    this.allDishes[index].sales += 1;
                  }
                });
              });
            });
            // generate item wise sales report
            this.allDishes.forEach((dish) => {
              let index = this.itemWiseReport.findIndex(
                (item) => item.id == dish.id
              );
              if (index == -1) {
                this.itemWiseReport.push({ ...dish, sales: dish.shopPrice });
              } else {
                this.itemWiseReport[index].quantity += dish.quantity;
                this.itemWiseReport[index].sales +=
                  dish.shopPrice * dish.quantity;
              }
            });
          });
      }
    });
  }

  exportSales() {
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Name','Sales','Price','Quantity', 'Id', 'Number']],
      body: this.itemWiseReport.map((item) => [
        item.dishName,
        item.sales,
        item.shopPrice,
        item.quantity,
        item.billId,
        item.billNo,
      ]),
    });
    doc.save('report.pdf');
  }
  exportBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Id']],
      body: this.bills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.id,
      ]),
    });
    doc.save('report.pdf');
  }
}
