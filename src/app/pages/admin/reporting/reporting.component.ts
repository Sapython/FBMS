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
  incompleteBills: any[] = [];
  upiBills: any[] = [];
  cardBills: any[] = [];
  cashBills: any[] = [];
  otherBills: any[] = [];
  restaurantBills:any[] = []
  roomBills:any[] = []
  totalReports: any;
  totalSales: number = 0;
  totalNonChargableSales: number = 0
  totalChargableSales:number = 0
  newCustomers:number = 0;
  cancelledKots:number = 0;
  cancelledBills: any[] = [];
  discountedBills: any[] = [];
  totalDiscountCost:number = 0;
  cancelledKotItems:any[] = []
  completedKots:number = 0;
  customers:any[] = []
  wastedItems:any[] = []
  loadedAllData:boolean = false;
  kotTokenStart: string = '';
  kotTokenEnd: string = '';
  billTokenEnd: string = '';
  billTokenStart: string = '';
  mode:'itemWiseReport' | 'totalNonChargableBills'|'totalCancelledBills'|'totalNonChargableBillsOther'|'billWiseReport'|undefined;
  range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  toFixed(num:number){
    return num.toFixed(2)
  }

  ngOnInit(): void {
    this.range.valueChanges.subscribe((value) => {
      if (value.start && value.end) {
        if (value.start?.getTime() == value.end?.getTime()) {
          value.end?.setHours(23);
          value.end?.setMinutes(59);
          value.end?.setSeconds(59);
        }
        // reset all values
        this.bills = [];
        this.itemWiseReport = [];
        this.allDishes = [];
        this.saleWiseReport = [];
        this.ncBills = [];
        this.incompleteBills = [];
        this.totalReports = null;
        this.totalSales = 0;
        this.totalNonChargableSales = 0
        this.totalChargableSales = 0
        this.newCustomers = 0;
        this.cancelledKots = 0;
        this.cancelledBills = [];
        this.cancelledKotItems = []
        this.completedKots = 0;
        this.customers = []
        this.loadedAllData = false;
        this.databaseService
          .getAllBills(value.start, value.end)
          .then((data) => {
            console.log("Docs",data)
            let bills:any[] = []
            data.forEach((doc) => {
              // console.log( ,doc.data()['selectedDiscounts'])
              if(doc.data()['deleted']==true){
                this.cancelledBills.push(doc.data())
              } else {
                if (doc.data()['selectedDiscounts'].length>0 && doc.data()['selectedDiscounts'].length<5){
                  console.log(doc.data()['selectedDiscounts'])
                  let disc = 0;
                  let subtotal = 0;
                  doc.data()['kots'].forEach((kot:any)=>{
                    if (kot['cancelled']==false){
                      kot.products.forEach((product:any) => {
                        subtotal += product.shopPrice * product.quantity;
                      });
                    }
                  })
                  doc.data()['selectedDiscounts'].forEach((discount:any)=>{
                    if(discount.discountType == 'percentage'){
                      disc += subtotal * (Number(discount.discountValue)/100)
                    } else {
                      disc += Number(discount.discountValue)
                    }
                    console.log(subtotal,discount.discountType,discount.discountValue)
                  })
                  console.log(disc,subtotal)
                  this.totalDiscountCost += disc
                  bills.push({...doc.data(),discount:disc,afterDisc:subtotal-disc,subtotal:subtotal});
                  this.discountedBills.push({...doc.data(),discount:disc,afterDisc:subtotal-disc,subtotal:subtotal});
                } else {
                  let subtotal = 0;
                  doc.data()['kots'].forEach((kot:any)=>{
                    if (kot['cancelled']==false){
                      kot.products.forEach((product:any) => {
                        subtotal += product.shopPrice * product.quantity;
                      });
                    }
                  })
                  bills.push({...doc.data(),subtotal:subtotal});
                }
              }
            })
            // remove duplicate bills by matching bill no
            bills = bills.filter((bill,index) => {
              return bills.findIndex(b => b.billNo == bill.billNo) == index
            })
            bills.forEach((bill) => {
              console.log("BULL",bill)
              if (bill.table?.type=='room'){
                this.roomBills.push(bill)
              } else if (bill.table?.type=='table'){
                this.restaurantBills.push(bill)
              }
              if (!this.billTokenStart){
                this.billTokenStart = bill.billNo
                if (bill.kots.length>0){
                  this.kotTokenStart = bill.kots[0].tokenNo
                }
              }
              this.billTokenEnd = bill.billNo 
              if (bill['completed'] == true) {
                if (!this.bills.find((b) => b.id == bill.id)) {
                  const grandTotal = Number(bill['grandTotal']);
                  console.log("grandTotal",bill['grandTotal'],bill['billNo'])
                  if(bill['isNonChargeable'] || bill['grandTotal']==0){
                    let total = 0;
                    bill['kots'].forEach((kot:any) => {
                      if (kot.cancelled == false && kot.finalized){
                        kot.products.forEach((item:any) => {
                          total += item.quantity * item.shopPrice
                        })
                      }
                      this.kotTokenEnd = kot.tokenNo
                    })
                    this.ncBills.push({...bill,subtotal:total})
                    this.totalNonChargableSales += total
                    this.totalSales += grandTotal
                  } else {
                    if (bill['paymentType'] == 'upi'){
                      this.upiBills.push(bill)
                    } else if (bill['paymentType'] == 'card'){
                      this.cardBills.push(bill)
                    } else if (bill['paymentType'] == 'cash'){
                      this.cashBills.push(bill)
                    } else {
                      this.otherBills.push(bill)
                    }
                    this.bills.push({...bill,grandTotal:grandTotal});
                    this.totalSales += grandTotal
                    this.totalChargableSales += grandTotal
                  }
                  bill['kots'].forEach((kot:any)=>{
                    if(kot.cancelled && kot.finalized){
                      this.cancelledKots++
                      kot.products.forEach((item:any)=>{
                        this.cancelledKotItems.push(item)
                      })
                    } else {
                      this.completedKots++
                    }
                    this.kotTokenEnd = kot.tokenNo
                  })
                }
                if (bill['customerInfo']['name'] || bill['customerInfo']['email'] || bill['customerInfo']['phoneNumber'] || bill['customerInfo']['address']){
                  this.newCustomers += 1
                  this.customers.push(bill['customerInfo'])
                }

              } else {
                this.incompleteBills.push(bill);
              }
            });
            // sort bills on the basis of bill number
            this.bills.sort((a, b) => {
              return a.billNo - b.billNo;
            });
            // console.log('this.bills', this.bills);
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
                    // console.log(index)
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
            // console.log('this.allDishes',prc, this.allDishes);
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
            this.wastedItems = []
            this.cancelledBills.forEach((bill) => {
              bill.kots.forEach((kot:any)=>{
                kot.products.forEach((item:any)=>{
                  // no duplicates
                  let index = this.wastedItems.findIndex((i:any)=>i.id==item.id)
                  if(index==-1){
                    this.wastedItems.push(item)
                  } else {
                    this.wastedItems[index].quantity += item.quantity
                  }
                })
              })
            })
            this.ncBills.forEach((bill) => {
              bill.kots.forEach((kot:any)=>{
                kot.products.forEach((item:any)=>{
                  // no duplicates
                  let index = this.wastedItems.findIndex((i:any)=>i.id==item.id)
                  if(index==-1){
                    this.wastedItems.push(item)
                  } else {
                    this.wastedItems[index].quantity += item.quantity
                  }
                })
              })
            })
            console.log("this.wastedItems",this.wastedItems)
            // sort allDishes in alphabetical order
            this.loadedAllData = true;
          });
      }
    });
  }
  exportSummary(){
    var doc:any = new jsPDF();
    doc.text('Sales Report', 10, 10);
    doc.text('Date: '+this.range.value.start?.toLocaleString()+' to '+this.range.value.end?.toLocaleString(), 10, 20);
    doc.text('Total Sales: '+this.totalSales, 10, 30);
    doc.text('Total Chargable Sales: '+this.totalChargableSales, 10, 40);
    doc.text('Total Non Chargable Sales: '+this.totalNonChargableSales, 10, 50);
    doc.text('Total Discount: '+this.totalDiscountCost, 10, 60);
    doc.text('Total Completed Kots: '+this.completedKots, 10, 70);
    doc.text('Total Cancelled Kots: '+this.cancelledKots, 10, 80);
    doc.text('Total New Customers: '+this.newCustomers, 10, 90);
    doc.text('KOT Token No: Start '+this.kotTokenStart+' End: '+this.kotTokenEnd, 10, 100);
    doc.text('Bill Token No: Start '+this.billTokenStart+' End: '+this.billTokenEnd, 10, 110);
    doc.save('SalesReport.pdf');
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
    // finals
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
    doc.save('Sales Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +' .pdf');
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
    doc.autoTable({
      head: [['Total']],
      body: [[this.bills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }
  exportUpiBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.upiBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.upiBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('UPI Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }

  exportCardBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.cardBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.cardBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('Card Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }

  exportCashBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.cashBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.cashBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('Cash Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }

  exportOtherBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.otherBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.otherBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('Other Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }
  
  exportRoomBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.roomBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.roomBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('Room Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }

  exportRestaurantBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.restaurantBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.restaurantBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('Restaurant Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }

  exportAllNonChargableBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Sub Total','Id']],
      body: this.ncBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.subtotal,
        bill.id,
      ]),
    });
    // finals
    doc.autoTable({
      head: [['Total']],
      body: [[this.ncBills.reduce((a,b)=>a+b.subtotal,0)]]
    })
    doc.save('All Non Chargable Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
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
    doc.autoTable({
      head: [['Total']],
      body: [[this.cancelledKotItems.reduce((a,b)=>a+b.shopPrice,0)]]
    })
    doc.save('All Cancelled Kot Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
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
    // finals
    doc.autoTable({
      head: [['Total Number']],
      body: [[this.customers.length]]
    })
    doc.save('All Customers Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }
  exportIncompleteBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.incompleteBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.incompleteBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('All Incomplete Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }
  exportCancelledBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Bill No.']],
      body: this.cancelledBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.cancelledBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('All Cancelled Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }
  exportDiscountedBills(){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Bill Number','Kots','Grand Total','Discount','Bill No.']],
      body: this.discountedBills.map((bill) => [
        bill.billNo,
        bill.kotTokens.join(','),
        bill.grandTotal,
        bill.discount || 0,
        bill.billNo,
      ]),
    });
    doc.autoTable({
      head: [['Total']],
      body: [[this.discountedBills.reduce((a,b)=>a+b.grandTotal,0)]]
    })
    doc.save('All Discounted Bills Report '+ this.range.value.start?.toDateString() +'- '+ this.range.value.start?.toDateString() +'.pdf');
  }
  calculateGrandTotal(bill:any){
    let subtotal = 0;
    bill['kots'].forEach((kot:any) => {
      if (kot.cancelled == false){
        kot.products.forEach((item:any) => {
          subtotal += item.quantity * item.shopPrice
        })
      }
    })
    let disc = 0
    if (bill['selectedDiscounts'].length > 0 && bill['selectedDiscounts'].length < 5){
      bill['selectedDiscounts'].forEach((discount:any)=>{
        if(discount.discountType == 'percentage'){
          disc += (subtotal/100)*Number(discount.discountValue)
        } else {
          disc += Number(discount.discountValue)
        }
      })
    }
    console.log("disc",disc)
    subtotal = subtotal - disc
    let cgst = (subtotal/100) * 2.5
    let sgst = (subtotal/100) * 2.5
    let total = subtotal + cgst + sgst
    return [total,subtotal]
  }
  
}
