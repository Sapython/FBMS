import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { elementAt } from 'rxjs';
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
    public items: { type: 'rawMaterials' | 'consumables'; items: any[] },
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
  itemsCopy: any[] = [];
  addTodaySheet: boolean = false;
  showHistory: boolean = true;
  totalSectionPrices: number[] = [];
  searchProgress: number = 0.0;
  title: string = "Today's Sheet";
  sortedItems: any[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    let items: any[] = [];
    this.items.items.forEach((element: any) => {
      items.push({
        ...element,
        closingFixed: Number(element.closingBalance.toFixed(2)),
      });
    });
    this.items.items = items;
    this.itemsCopy = JSON.parse(JSON.stringify(this.items.items));
    console.log(this.items);
    // get today's date
    var today = new Date();
    // today.setDate(today.getDate() +15);
    today.setMonth(3);
    console.log(today);
    this.databaseService.getSettings().then((settings:any) => {
      if (settings) {
        console.log("Passed",settings.data()['updateRateThresold'])
        let quarterMonths = [3, 6, 9, 12];
        if (quarterMonths.includes(today.getMonth())) {
          this.title = "This quarter's Sheet";
          this.items.items.forEach((element: any) => {
            if (element.updatePeriod == 'Quarterly') {
              this.sortedItems.push(element);
            } else if (element.ratePerUnit > settings.data()['updateRateThresold']) {
              this.sortedItems.push(element);
            } else if (element.updatePeriod == 'Daily') {
              this.sortedItems.push(element);
            }
          });
        } else if (
          (today.getMonth() != 1 &&
            (today.getDate() == 30 || today.getDate() == 31)) ||
          (today.getMonth() == 1 &&
            (today.getDate() == 28 || today.getDate() == 29))
        ) {
          this.title = "This month's Sheet";
          this.items.items.forEach((element: any) => {
            if (element.updatePeriod == 'Monthly') {
              this.sortedItems.push(element);
            } else if (element.ratePerUnit >  settings.data()['updateRateThresold']) {
              this.sortedItems.push(element);
            } else if (element.updatePeriod == 'Daily') {
              this.sortedItems.push(element);
            }
          });
        } else if (today.getDay() == 6 || today.getDay() == 0) {
          this.title = "This year's Sheet";
          this.items.items.forEach((element: any) => {
            if (element.updatePeriod == 'Yearly') {
              this.sortedItems.push(element);
            } else if (element.ratePerUnit >  settings.data()['updateRateThresold']) {
              this.sortedItems.push(element);
            } else if (element.updatePeriod == 'Daily') {
              this.sortedItems.push(element);
            }
          });
        }
        this.items.items.forEach((element: any) => {
          if(element.updatePeriod == 'Daily'){
            this.sortedItems.push(element);
          } else if (element.ratePerUnit >  settings.data()['updateRateThresold']) {
            this.sortedItems.push(element);
          }
        })
      }
    });
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
    // find the difference between the two arrays using quantity or issued
    items.forEach((mainIngredient: any) => {
      this.itemsCopy.forEach((element) => {
        if (mainIngredient.id === element.id) {
          if (mainIngredient.closingFixed !== element.closingFixed) {
            differenceArray.push({
              ...mainIngredient,
              quantity: mainIngredient.closingFixed,
              closingBalance: mainIngredient.closingFixed,
            });
          }
        }
      });
    });
    console.log(differenceArray);
    if (differenceArray.length > 0) {
      let promisesArray: Promise<any>[] = [];
      differenceArray.forEach((element) => {
        promisesArray.push(
          this.databaseService.updateIngredient(element, element.id)
        );
      });
      Promise.all(promisesArray)
        .then(() => {
          this.alertify.presentToast('Opening Balance Updated Successfully');
          this.saveOpeningBalance.emit(differenceArray);
        })
        .catch((err) => {
          console.log(err);
          this.alertify.presentToast('Error Updating Opening Balance');
        });
    }
  }
}
