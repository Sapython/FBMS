import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
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
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider:DataProvider
  ) {}
  sheet: any[] = [];
  purchaseSheet: any[] = [];
  stockSheet:any[] = [];
  itemsCopy: StockItem[] = [];
  addTodaySheet: boolean = false;
  showHistory: boolean = false;
  ngOnInit(): void {
    this.itemsCopy = JSON.parse(JSON.stringify(this.items.items));
    console.log(this.items);
    this.range.valueChanges.subscribe((value) => {
      console.log(value);
      this.showHistory = false;
      // check if the start and end are same date
      if (value.start?.getTime() == value.end?.getTime()) {
        value.end?.setHours(24);
        console.log("Same", value);
      }
      if (value.start && value.end) {
        this.sheet = [];
        this.purchaseSheet = [];
        this.dataProvider.pageSetting.blur = true;
        this.databaseService
          .getBalanceHitory(value.start, value.end)
          .then((docs: any) => {
            // console.log(docs);
            let counter = 0;
            let allDateWiseData:any = {}
            docs.forEach((element: any) => {
              // console.log(element);
              this.databaseService.getBalanceHistoryIngredients(element.data().items,element.id).then((res:any)=>{
                // console.log(res);
                // if (allDateWiseData[element.data().date.toDate().toDateString()]) {
                //   allDateWiseData[element.data().date.toDate().toDateString()].history.push(res);
                // } else {
                //   allDateWiseData[element.data().date.toDate().toDateString()].history = [res];
                // }
                this.sheet.push({ ...element.data(), id: element.id,items:res });
              })
              counter++;
            });
            console.log("Balances "+counter);
            console.log("allDateWiseData",allDateWiseData);
          }).finally(()=>{
            this.dataProvider.pageSetting.blur =false;
          });
        this.databaseService.getPurchasesHistory(value.start, value.end).then(async (docs) => {
          let allDateWiseData:any = {}
          let counter = 0;
          docs.forEach((element: any) => {
            console.log(element);
            this.databaseService.getPurchaseHistoryIngredients(element.data().items,element.id).then((res:any)=>{
              // console.log(res);
              this.purchaseSheet.push({ ...element.data(), id: element.id,items:res });
              console.log(this.purchaseSheet)
            })
            counter++;
          });
          // for (var iter of docs.docs) {
          //   console.log('Iter',iter.data())
          //   const element:any = iter;
          //   const res = await this.databaseService.getPurchaseHistoryIngredients(element.data().items,element.id)
          //   console.log(res);
          //   if (element.data().date && element.data().date.toDate() && element.data().date.toDate().toDateString()){
          //     if (allDateWiseData[element.data().date.toDate().toDateString()]) {
          //       allDateWiseData[element.data().date.toDate().toDateString()].history.push({items:res,date:element.data().date.toDate()});
          //     }
          //      else {
          //       allDateWiseData[element.data().date.toDate().toDateString()].history = [res];
          //     }
          //   }
          //     counter++;
          // }
          console.log("Purchases "+counter);
          console.log("allDateWiseData",allDateWiseData);
          // this.purchaseSheet = Object.values(allDateWiseData);
          // console.log("this.purchaseSheet",this.purchaseSheet);
        }).finally(()=>{
          this.dataProvider.pageSetting.blur =false;
        })

        this.databaseService.getStockHistory(value.start, value.end).then(async (docs) => {
          let allDateWiseData:any = {}
          let counter = 0;
          docs.forEach((element: any) => {
            console.log(element);
            this.databaseService.getStockHistoryIngredients(element.data().items,element.id).then((res:any)=>{
              // console.log(res);
              this.stockSheet.push({ ...element.data(), id: element.id,items:res });
              console.log(this.stockSheet)
            })
            counter++;
          });
          // for (var iter of docs.docs) {
          //   console.log('Iter',iter.data())
          //   const element:any = iter;
          //   const res = await this.databaseService.getPurchaseHistoryIngredients(element.data().items,element.id)
          //   console.log(res);
          //   if (element.data().date && element.data().date.toDate() && element.data().date.toDate().toDateString()){
          //     if (allDateWiseData[element.data().date.toDate().toDateString()]) {
          //       allDateWiseData[element.data().date.toDate().toDateString()].history.push({items:res,date:element.data().date.toDate()});
          //     }
          //      else {
          //       allDateWiseData[element.data().date.toDate().toDateString()].history = [res];
          //     }
          //   }
          //     counter++;
          // }
          console.log("Stock "+counter);
          console.log("allDateWiseData",allDateWiseData);
          // this.purchaseSheet = Object.values(allDateWiseData);
          // console.log("this.purchaseSheet",this.purchaseSheet);
        }).finally(()=>{
          this.dataProvider.pageSetting.blur =false;
        })
      }
    });
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null,[Validators.required]),
    end: new FormControl<Date | null>(null,[Validators.required]),
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

  saveTodaySheet(items: any[]) {
    // console.log(items);
    let differenceArray: any[] = [];
    let itemDifferenceArray: any[] = [];
    // find the difference between the two arrays using quantity or issued
    items.forEach((mainIngredient: any) => {
      const forSheet = this.itemsCopy.find((element: any) => {
        return (
          element.id == mainIngredient.id && mainIngredient.used > 0
        );
      });
      if (forSheet) {
        forSheet.closingBalance = JSON.parse(JSON.stringify((mainIngredient.openingBalance || 0) - (mainIngredient.used || 0)))
        mainIngredient.openingBalance = JSON.parse(JSON.stringify(forSheet.closingBalance))
        mainIngredient.quantity = mainIngredient.openingBalance
        itemDifferenceArray.push(mainIngredient);
        differenceArray.push(forSheet);
      }
    });
    console.log("DIFFS",differenceArray, itemDifferenceArray);
    const allIds: string[] = [];
    differenceArray.forEach((item: any) => {
      allIds.push(item.id);
    });
    const data = {
      date: new Date(),
      items: allIds,
    };
    this.dataProvider.pageSetting.blur = true;
    if (differenceArray.length > 0) {
      this.databaseService.getIngredients().then((docs) => {
        this.itemsCopy = [];
        docs.forEach((element: any) => {
          this.itemsCopy.push({ ...element.data(), id: element.id });
        });
      })
      Promise.all(
        itemDifferenceArray.map((item) => {
          return this.databaseService.updateIngredient(item, item.id);
        })
      ).then(() => {
        this.databaseService
          .addBalanceHistory(data, differenceArray)
          .then((res: any) => {
            console.log(res);
            this.addTodaySheet = false;
            this.alertify.presentToast('Saved Successfully');
          })
          .catch((err: any) => {
            console.log(err);
            this.alertify.presentToast('Error Occured');
          }).finally(()=>{
            this.dataProvider.pageSetting.blur = false;
          });
      }).catch((err)=>{
        this.dataProvider.pageSetting.blur = false;
      });
    } else {
      this.alertify.presentToast('No Items to Save');
    }
  }
}
