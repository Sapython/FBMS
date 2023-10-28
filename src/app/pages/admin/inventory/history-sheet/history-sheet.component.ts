import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { StockItem } from '../inventory.component';

@Component({
  selector: 'app-history-sheet',
  templateUrl: './history-sheet.component.html',
  styleUrls: ['./history-sheet.component.scss']
})
export class HistorySheetComponent implements OnInit {
  @Output() saveOpeningBalance: EventEmitter<StockItem[]> = new EventEmitter<
  StockItem[]
>();
dates: string[] = [];
constructor(
  @Inject(DIALOG_DATA)
  public items: { type: 'rawMaterials' | 'consumables'; items: StockItem[] },
  private databaseService: DatabaseService,
  private alertify: AlertsAndNotificationsService,
  private dataProvider: DataProvider
) {}
sheet: any[] = [];
finalValueSheet: any[] = [];
sheetsFinalPrices: any[] = [];
purchaseSheetsFinalPrices: any[] = [];
stockSheetFinalPrices: any[] = [];
purchaseSheet: any[] = [];
stockSheet: any[] = [];
itemsCopy: StockItem[] = [];
addTodaySheet: boolean = false;
showHistory: boolean = true;
totalSectionPrices: number[] = [];
searchProgress:number = 0.0;
endFormControl = new FormControl<Date | null>(null, [Validators.required])
range = new FormGroup({
  start: new FormControl<Date | null>(null, [Validators.required]),
  end: this.endFormControl,
});
getKey(item: any) {  
  return Object.keys(item);
}
ngOnInit(): void {
  this.itemsCopy = JSON.parse(JSON.stringify(this.items.items));
  console.log(this.items);
  this.endFormControl.valueChanges.subscribe((value) => {
    console.log("Custom",value);
    this.range.value.end = value;
    if(value){
      console.log(this.range.value);
      this.showHistory = true;
      this.setValue(this.range.value);
    }
  });
}
addItems(item: any[], key: string) {
  // sum items and return value
  let sum = 0;
  item.forEach((element: any) => {
    sum += element[key];
  });
  return sum;
}
getFinalPrice(index: string, sheet: any[]) {
  console.log('SHEET', sheet);
  if (sheet && sheet.length > 0) {
    let total = 0;
    console.log(sheet);
    const foundItem = sheet.find((element: any) => {
      console.log('dateText', element, element.dateText);
      return true;
    });
    console.log('foundItem', foundItem);
    foundItem.history.forEach((element: any) => {
      total += element.sectionPrice;
    });
  }
  return 0;
}
setValue(value: any) {
  console.log("value 123",value);
  if (value.start && value.end) {
    console.log("Passed")
    if (value.start?.getTime() == value.end?.getTime()) {
      value.end?.setHours(24);
    }
    if (value.start && value.end) {
      this.sheet = [];
      this.stockSheet = [];
      this.purchaseSheet = [];
      this.dataProvider.pageSetting.blur = true;
      Promise.all([
        this.getBalanceSheet(value),
        this.getPurchaseHistory(value),
        this.getStockHistory(value),
        this.getFinalValuehistory(value)
      ]).then((values) => {
        this.alertify.presentToast("Fetched all history")
      }).catch((err) => {
        this.alertify.presentToast("Error fetching history")
      }).finally(() => {
        this.dataProvider.pageSetting.blur = false;
      })
    }
  }
}

async getFinalValuehistory(value: any) {
  const docs = await this.databaseService.getFinalValueHistory(
    value.start,
    value.end
  );
  let allDateWiseData: any = {};
  let counter = 0;
  docs.forEach((element: any) => {
    if (allDateWiseData[element.data().date.toDate().toDateString()]) {
      allDateWiseData[element.data().date.toDate().toDateString()].items.push(
        element.data()
      );
    } else {
      allDateWiseData[element.data().date.toDate().toDateString()] = {
        items: [element.data()],
        date: element.data().date.toDate(),
      };
    }
  });
  this.finalValueSheet = Object.values(allDateWiseData);
}

async getStockHistory(value: { start: Date; end: Date }) {
  function sumStockItems(item: any[]) {
    let sum = 0;
    item.forEach((element: any) => {
      sum +=
        (element.newQuantity + element.quantity) * element.newRatePerUnit;
    });
    return sum;
  }
  const docs = await this.databaseService.getStockHistory(
    value.start,
    value.end
  );
  let allDateWiseData: any = {};
  let counter = 0;
  for (let item of docs.docs) {
    const element: any = item;
    const res = await this.databaseService.getStockHistoryIngredients(
      element.data().items,
      element.id
    );
    if (allDateWiseData[element.data().date.toDate().toDateString()]) {
      allDateWiseData[
        element.data().date.toDate().toDateString()
      ].history.push({
        items: res,
        id: element.id,
        date: element.data().date.toDate(),
        sectionPrice: sumStockItems(res),
      });
    } else {
      allDateWiseData[element.data().date.toDate().toDateString()] = {
        history: [
          {
            items: res,
            id: element.id,
            date: element.data().date.toDate(),
            sectionPrice: sumStockItems(res),
          },
        ],
        date: element.data().date.toDate(),
        active: element.id,
        sectionPrice: this.addItems(res, 'finalPrice'),
      };
    }
    counter++;
  }
  this.stockSheet = Object.values(allDateWiseData);
  console.log(this.stockSheet);
  this.stockSheetFinalPrices = [];
  this.stockSheet.forEach((element: any) => {
    console.log('element.history', element.history);
    let finalPrice = 0;
    element.history.forEach((history: any) => {
      finalPrice += history.sectionPrice;
    });
    console.log(finalPrice);
    this.stockSheetFinalPrices.push(finalPrice);
  });
}

async getPurchaseHistory(value: { start: Date; end: Date }) {
  function addPurchaseItems(item: any[]) {
    console.log('BIS', item);
    let sum = 0;
    item.forEach((element: any) => {
      sum += element.newQuantity * element.newRatePerUnit;
    });
    return sum;
  }
  const docs = await this.databaseService.getPurchasesHistory(
    value.start,
    value.end
  );
  let allDateWiseData: any = {};
  let counter = 0;
  for (let item of docs.docs) {
    const element: any = item;
    const res = await this.databaseService.getPurchaseHistoryIngredients(
      element.data().items,
      element.id
    );
    if (allDateWiseData[element.data().date.toDate().toDateString()]) {
      allDateWiseData[
        element.data().date.toDate().toDateString()
      ].history.push({
        items: res,
        id: element.id,
        date: element.data().date.toDate(),
        sectionPrice: addPurchaseItems(res),
      });
    } else {
      allDateWiseData[element.data().date.toDate().toDateString()] = {
        history: [
          {
            items: res,
            id: element.id,
            date: element.data().date.toDate(),
            sectionPrice: addPurchaseItems(res),
          },
        ],
        date: element.data().date.toDate(),
        active: element.id,
        sectionPrice: this.addItems(res, 'finalPrice'),
      };
    }
    counter++;
  }

  this.purchaseSheet = Object.values(allDateWiseData);
  console.log(this.purchaseSheet);
  this.purchaseSheetsFinalPrices = [];
  this.purchaseSheet.forEach((element: any) => {
    console.log('element.history', element.history);
    let finalPrice = 0;
    element.history.forEach((history: any) => {
      finalPrice += history.sectionPrice;
    });
    console.log(finalPrice);
    this.purchaseSheetsFinalPrices.push(finalPrice);
  });
}

async getBalanceSheet(value: { start: Date; end: Date }) {
  function addBalanceHistoryValue(item: any[], key: string) {
    // console.log("BIS",item)
    let sum = 0;
    item.forEach((element: any) => {
      sum +=
        (element.openingBalance - element.closingBalance) *
        element.newRatePerUnit;
    });
    return sum;
  }
  const docs = await this.databaseService.getBalanceHitory(
    value.start,
    value.end
  );
  let counter = 0;
  let allDateWiseData: any = {};
  let allPrices: number = 0;
  for (let item of docs.docs) {
    const element: any = item;
    const res = await this.databaseService.getBalanceHistoryIngredients(
      element.data().items,
      element.id
    );
    if (allDateWiseData[element.data().date.toDate().toDateString()]) {
      allDateWiseData[
        element.data().date.toDate().toDateString()
      ].history.push({
        items: res,
        id: element.id,
        date: element.data().date.toDate(),
        sectionPrice: addBalanceHistoryValue(res, 'finalPrice'),
      });
    } else {
      console.log(res);
      allDateWiseData[element.data().date.toDate().toDateString()] = {
        history: [
          {
            items: res,
            id: element.id,
            date: element.data().date.toDate(),
            sectionPrice: addBalanceHistoryValue(res, 'finalPrice'),
          },
        ],
        date: element.data().date.toDate(),
        dateText: element.data().date.toDate().toDateString(),
        active: element.id,
      };
      allPrices += this.addItems(res, 'finalPrice');
    }
    counter++;
  }
  this.sheet = Object.values(allDateWiseData);
  this.sheetsFinalPrices = [];
  this.sheet.forEach((element: any) => {
    console.log('element.history', element.history);
    let finalPrice = 0;
    element.history.forEach((history: any) => {
      finalPrice += history.sectionPrice;
    });
    console.log(finalPrice);
    this.sheetsFinalPrices.push(finalPrice);
  });
  console.log(this.sheet);
}

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

roundOff(value: number) {
  if (value) {
    return value.toFixed(2);
  } else {
    return '0.00';
  }
}

saveTodaySheet(items: any[]) {
  // console.log(items);
  let differenceArray: any[] = [];
  let itemDifferenceArray: any[] = [];
  // find the difference between the two arrays using quantity or issued
  items.forEach((mainIngredient: any) => {
    const forSheet = this.itemsCopy.find((element: any) => {
      return element.id == mainIngredient.id && mainIngredient.used > 0;
    });
    if (forSheet) {
      forSheet.closingBalance =
        JSON.parse(
          JSON.stringify(
            (mainIngredient.openingBalance || 0) - (mainIngredient.used || 0)
          )
        ) || 0;
      mainIngredient.openingBalance = JSON.parse(
        JSON.stringify(forSheet.closingBalance)
      );
      mainIngredient.quantity = mainIngredient.openingBalance;
      itemDifferenceArray.push(mainIngredient);
      differenceArray.push(forSheet);
    }
  });
  console.log('DIFFS', differenceArray, itemDifferenceArray);
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
    });
    Promise.all(
      itemDifferenceArray.map((item) => {
        return this.databaseService.updateIngredient(item, item.id);
      })
    )
      .then(() => {
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
          })
          .finally(() => {
            this.dataProvider.pageSetting.blur = false;
          });
      })
      .catch((err) => {
        this.dataProvider.pageSetting.blur = false;
      });
  } else {
    this.alertify.presentToast('No Items to Save');
  }
}
}
