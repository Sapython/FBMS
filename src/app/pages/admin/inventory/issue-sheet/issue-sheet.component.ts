import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { StockItem } from '../inventory.component';

@Component({
  selector: 'app-issue-sheet',
  templateUrl: './issue-sheet.component.html',
  styleUrls: ['./issue-sheet.component.scss'],
})
export class IssueSheetComponent implements OnInit {
  itemsCopy: StockItem[] = [];
  constructor(
    @Inject(DIALOG_DATA)
    public items: { type: 'rawMaterials' | 'consumables'; items: StockItem[] },
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}
  @Output() closed: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.itemsCopy = JSON.parse(JSON.stringify(this.items.items));
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
