import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { StockItem } from '../inventory.component';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss'],
})
export class BalanceSheetComponent implements OnInit {
  @Output() saveOpeningBalance: EventEmitter<StockItem[]> = new EventEmitter<
    StockItem[]
  >();
  dates: string[] = [];
  constructor(
    @Inject(DIALOG_DATA)
    public items: { type: 'rawMaterials' | 'consumables'; items: StockItem[] },
    private databaseService:DatabaseService,
    private alertify:AlertsAndNotificationsService
  ) {}
  sheet:any[] = []
  itemsCopy: StockItem[] = [];
  addTodaySheet:boolean = false;
  ngOnInit(): void {
    this.itemsCopy = JSON.parse(JSON.stringify(this.items.items))
    this.range.valueChanges.subscribe((value) => {
      console.log(value);
      if (value.start && value.end) {
        // var daysOfYear = [];
        // for (
        //   var d = value.start;
        //   d <= value.end;
        //   d.setDate(d.getDate() + 1)
        // ) {
        //   daysOfYear.push(new Date(d));
        // }
        // console.log(daysOfYear);
        // this.
        this.databaseService.getBalanceHitory(value.start,value.end).then((docs:any)=>{
          console.log(docs);
          let counter = 0;
          docs.forEach((element:any) => {
            console.log(element)
            this.sheet.push({...element.data(),id:element.id})
            counter++;
          });
          console.log(counter);
        })
      }
    });
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  addQuantity(index: number) {
    if (this.items.type == 'consumables') {
      this.items.items[index].quantity++;
    } else {
      this.items.items[index].quantity++;
    }
  }

  removeQuantity(index: number) {
    if (this.items.type == 'consumables') {
      if (this.items.items[index].quantity > 0) {
        this.items.items[index].quantity--;
      }
    } else {
      if (this.items.items[index].quantity > 0) {
        this.items.items[index].quantity--;
      }
    }
  }

  saveTodaySheet(items:any[]){
    // console.log(items);
    let differenceArray:any[] = []
    // find the difference between the two arrays using quantity or issued
    items.forEach((item:any)=>{
     const found = this.itemsCopy.find((element:any)=>{
      return element.id == item.id && (element.quantity != item.quantity || element.issued != item.issued || element.ratePerUnit   != item.ratePerUnit)
     }) 
     if(found){
      differenceArray.push(found)
     }
    })
    console.log(differenceArray);
    const allIds:string[] = []
    differenceArray.forEach((item:any)=>{
      allIds.push(item.id)
    })
    const data = {
      date:new Date(),
      items:allIds
    }
    this.databaseService.addBalanceHistory(data,differenceArray).then((res:any)=>{
      console.log(res);
      this.addTodaySheet = false;
      this.alertify.presentToast("Saved Successfully")
    }).catch((err:any)=>{
      console.log(err);
      this.alertify.presentToast("Error Occured")
    })
  }
}
