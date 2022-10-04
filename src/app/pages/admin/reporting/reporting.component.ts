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
  ncBills: any[] = [];
  totalReports: any;
  totalSales: number = 0;
  totalNonChargableSales: number = 0
  totalChargableSales:number = 0
  newCustomers:number = 0;
  cancelledKots:number = 0;
  cancelledKotItems:any[] = []
  completedKots:number = 0;
  customers:any[] = []
  loadedAllData:boolean = false;
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
            console.log("Docs",data)
            data.forEach((bill) => {
              if (bill.data()['completed'] == true) {
                // this.bills.push(bill.data());
                if (!this.bills.find((b) => b.id == bill.id)) {
                  if(bill.data()['isNonChargeable']){
                    this.ncBills.push(bill.data())
                    this.totalNonChargableSales += bill.data()['grandTotal']
                    this.totalSales += bill.data()['grandTotal']
                  } else {
                    this.bills.push(bill.data());
                    this.totalSales += bill.data()['grandTotal']
                    this.totalChargableSales += bill.data()['grandTotal']
                  }
                  bill.data()['kots'].forEach((kot:any)=>{
                    if(kot.cancelled){
                      this.cancelledKots++
                      kot.products.forEach((item:any)=>{
                        this.cancelledKotItems.push(item)
                      })
                    } else {
                      this.completedKots++
                    }
                  })
                }
                if (bill.data()['customerInfo']['name'] || bill.data()['customerInfo']['email'] || bill.data()['customerInfo']['phoneNumber'] || bill.data()['customerInfo']['address']){
                  this.newCustomers += 1
                  this.customers.push(bill.data()['customerInfo'])
                }
              }
            });
            // sort bills on the basis of bill number
            this.bills.sort((a, b) => {
              return a.billNo - b.billNo;
            });
            console.log('this.bills', this.bills);
            // add all dishes
            let prc = 0
            this.allDishes = []
            this.bills.forEach((bill) => {
              bill.kots.forEach((kot: any) => {
                kot.products.forEach((product: any) => {
                  // this.allDishes.push(product)
                  // find id the dish exists increase the quantity
                  let index = this.allDishes.findIndex(
                    (dish) => dish.id == product.id
                    );
                    console.log(index)
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
                  prc++;
                });
              });
            });
            console.log('this.allDishes',prc, this.allDishes);
            // generate item wise sales report
            this.allDishes.forEach((dish) => {
              let index = this.itemWiseReport.findIndex(
                (item) => item.id == dish.id || item.dishName == dish.dishName
              );
              if (index == -1) {
                this.itemWiseReport.push({ ...dish, sales: dish.shopPrice });
              } else {
                this.itemWiseReport[index].quantity += dish.quantity;
                this.itemWiseReport[index].sales +=
                  dish.shopPrice * dish.quantity;
              }
            });
            // sort allDishes in alphabetical order
            this.loadedAllData = true;
          });
      }
    });
  }

  exportSales() {
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Total Dishes','Total Quantity','Total Bills','Total Price']],
      body:[
        [
          this.allDishes.length,
          this.allDishes.reduce((a,b)=>a+b.quantity,0),
          this.bills.length,
          this.allDishes.reduce((a,b)=>a+b.shopPrice,0)
        ]
      ]
    })
    doc.autoTable({
      head: [['Name','Price','No. Of Bills','Total Quantity', 'Total Price']],
      body: this.allDishes.map((item) => [
        item.dishName,
        item.shopPrice,
        item.sales,
        item.quantity,
        item.quantity * item.shopPrice,
      ]),
    });
    doc.save('report.pdf');
  }
  exportBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.bills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.save('report.pdf');
  }
  exportAllNonChargableBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Id']],
      body: this.ncBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.id,
      ]),
    });
    doc.save('report.pdf');
  }
  exportCancelledKots(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Item Name','Quantity','Price','Total']],
      body: this.cancelledKotItems.map((item) => [
        item.dishName,
        item.quantity,
        item.shopPrice,
        item.quantity * item.shopPrice,
      ]),
    });
    doc.save('report.pdf');
  }
  exportCustomers(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Name','Email','Phone Number','Address']],
      body: this.customers.map((customer) => [
        customer.name,
        customer.email,
        customer.phoneNumber,
        customer.address,
      ]),
    });
    doc.save('report.pdf');
  }
}
