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
  itemsCopy: StockItem[] = [];
  addTodaySheet: boolean = false;
  ngOnInit(): void {
    this.itemsCopy = JSON.parse(JSON.stringify(this.items.items));
    console.log(this.items);
    this.range.valueChanges.subscribe((value) => {
      console.log(value);
      if (value.start && value.end) {
        this.databaseService
          .getBalanceHitory(value.start, value.end)
          .then((docs: any) => {
            // console.log(docs);
            let counter = 0;
            docs.forEach((element: any) => {
              console.log(element);
              this.databaseService.getBalanceHistoryIngredients(element.data().items,element.id).then((res:any)=>{
                // console.log(res);
                this.sheet.push({ ...element.data(), id: element.id,items:res });
              })
              counter++;
            });
            // console.log(counter);
          });
        this.databaseService.getPurchasesHistory(value.start, value.end).then((docs: any) => {
          // console.log(docs);
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

          // console.log(counter);
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
    items.forEach((item: any) => {
      const found = this.itemsCopy.find((element: any) => {
        return (
          element.id == item.id && element.closingBalance != item.closingBalance
        );
      });
      if (found) {
        differenceArray.push(found);
        itemDifferenceArray.push(item);
      }
    });
    console.log(differenceArray, itemDifferenceArray);
    const allIds: string[] = [];
    differenceArray.forEach((item: any) => {
      allIds.push(item.id);
    });
    const data = {
      date: new Date(),
      items: allIds,
    };
    this.dataProvider.pageSetting.blur = true;
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
  }
}
