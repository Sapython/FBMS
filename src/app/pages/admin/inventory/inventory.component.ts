import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { IssueSheetComponent } from './issue-sheet/issue-sheet.component';
import { HistorySheetComponent } from './history-sheet/history-sheet.component';

const ELEMENT_DATA: any[] = [
];

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit, AfterViewInit {
  allMaterials: StockItem[] = [];

  categories: string[] = ['rawMaterials'];
  updateStockItems: boolean = false;
  showDifferenceBalance: boolean = false;
  constructor(
    private dialogModule: Dialog,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  length: number = this.allMaterials.length;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 50, 100];
  pageEvent: any;
  currentTab: string = 'Raw Material';
  copyIngredients: StockItem[] = [];
  purchaseMode: boolean = false;
  isActionActive: boolean = false;
  currrentAction: 'quantity' | 'purchase' | '' = '';
  categoryWisePrices: any = {};
  currentUpdateAction: 'quantity' | 'purchase' | 'balance' | 'addItem' | 'updateItem'| 'duplicateItem' | 'deleteItem' | '' = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.dataProvider.pageSetting.blur = true;
    this.allMaterials = [];
    this.categories = [];
    this.databaseService.getIngredientCategories().then((categories: any) => {
      if (categories.data()) {
        this.categories = categories.data().categories;
        console.log(this.categories);
      } else {
        console.log('No Categories Found');
        this.categories = [];
      }
    });
    this.databaseService.getIngredients().then((ingredients: any) => {
      this.allMaterials = [];
      ingredients.forEach((item: any) => {
        // console.log('ingredients.map', item.data());
        this.allMaterials.push({
          ...item.data(),
          id: item.id,
          issued: item.data().issued || 0,
          touched: false,
          openingBalance: item.data().quantity,
          closingBalance: item.data().quantity,
          newQuantity: 0,
          newRatePerUnit: item.data().ratePerUnit,
          quantity: Number(item.data().quantity),
          used: 0,
        });
      });
      if (this.currentUpdateAction){
        this.setStockFinalValueHistory(this.currentUpdateAction);
      }
      this.allMaterials.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      // console.log('allMaterials', this.allMaterials);
      this.copyIngredients = JSON.parse(JSON.stringify(this.allMaterials));
      this.dataProvider.pageSetting.blur = false;
      // console.log('ingredients', ingredients);
    });
  }

  addCategory() {
    const category = prompt('Enter Category Name');
    if (category) {
      this.databaseService
        .addIngredientCategory(category)
        .then((doc: any) => {
          this.alertify.presentToast('Category Added Successfully');
        })
        .catch((error: any) => {
          this.alertify.presentToast(error.message);
        });
    } else {
      this.alertify.presentToast('Category Name is Required');
    }
  }

  changeOcurred() {}

  setStockFinalValueHistory(action: 'quantity' | 'purchase' | 'balance' | 'addItem' | 'updateItem'| 'duplicateItem' | 'deleteItem' | '') {
    alert('Started stock history updating');
    setTimeout(() => {
      const data = {
        action: action,
        date: new Date(),
        categoryWisePrices: this.categoryWisePrices,
      };
      console.log(data)
      if (!action && this.categoryWisePrices) {
        alert('Restarting')
        this.setStockFinalValueHistory(action);
      }
      this.databaseService
        .addFinalValueHistory(data)
        .then((doc: any) => {
          this.alertify.presentToast('Final Value History Updated');
          alert('Final Value History Updated');
        })
        .finally(() => {
          this.currentUpdateAction = '';
        });
    }, 5000);
  }

  exportReport(category:string){
    var doc:any = new jsPDF();
    doc.autoTable({
      head: [['Total Ingredients','Total Quantity','Total Price']],
      body:[
        [
          this.allMaterials.length,
          (this.allMaterials.reduce((a,b)=>a+b.quantity,0)).toFixed(2),
          this.categoryWisePrices[category]
        ]
      ]
    })
    doc.autoTable({
      head: [['Name','Price','Quantity','Total Gross Value']],
      body: this.allMaterials.map((item) => [
        item.name,
        item.ratePerUnit.toFixed(2),
        item.quantity.toFixed(2),
        (item.ratePerUnit * item.quantity).toFixed(2)
      ]),
    });
    doc.save('report.pdf');
  }

  getIngredients(type: string) {
    const filtered = this.allMaterials.filter((item) => {
      return item.category == type;
    });
    // sum Filtered
    let sum = 0;
    filtered.forEach((item) => {
      sum += Number(
        item.finalPrice ? item.finalPrice : item.ratePerUnit * item.quantity
      );
    });
    // console.log('sum', sum);
    this.categoryWisePrices[type] = this.roundOff(sum);
    return filtered;
  }

  editRecipe(recipe: StockItem) {
    const inst = this.dialogModule.open(UpdateStockComponent, {
      data: recipe,
    });
    // modal.ins
  }

  addNewItem() {
    const inst = this.dialogModule.open(AddNewItemComponent, {
      data: {
        method: 'add',
      },
    });
    inst.componentInstance?.hideModal.subscribe((data: any) => {
      inst.close();
      this.currentUpdateAction = 'addItem'
      this.ngOnInit();
    });
  }

  addQuantity(index: number, category: string) {
    this.getIngredients(category)[index].newQuantity++;
  }

  removeQuantity(index: number, category: string) {
    this.getIngredients(category)[index].newQuantity--;
  }

  compareOpeningClosingBalance() {
    this.isActionActive = true;
    // console.log("ALLMATS",this.allMaterials,this.copyIngredients)
    this.allMaterials.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (item[key] == undefined) {
          console.log('undefined', key, item);
          this.databaseService.addDebugLog({
            message: 'Found an undefined item in ingredients',
            key: key,
            item: item,
            date: new Date(),
          });
          alert(
            'Found error in the database. Please contact the developer. +919517457296'
          );
          return;
        }
      });
    });
    const inst = this.dialogModule.open(BalanceSheetComponent, {
      data: {
        type: 'rawMaterials',
        items: this.allMaterials,
      },
    });
    inst.componentInstance!.saveOpeningBalance.subscribe((data: any) => {
      console.log('saveOpeningBalance', data);
      this.allMaterials = data;
      let updatePromises: Promise<void>[] = [];
      // compare from copy to allMaterials and update the quantity
      this.copyIngredients.forEach((item: StockItem) => {
        const copyItem = this.allMaterials.find((copy) => {
          console.log(
            'item',
            copy.quantity,
            item.quantity,
            copy.id,
            item.id,
            copy.quantity != item.quantity && copy.id == item.id
          );
          return copy.quantity != item.quantity && copy.id == item.id;
        });
        console.log('copyItem', copyItem);
        if (copyItem) {
          if (copyItem.id) {
            copyItem.finalPrice = copyItem.quantity * copyItem.ratePerUnit;
            updatePromises.push(
              this.databaseService
                .updateIngredientQuantity(
                  copyItem.quantity,
                  copyItem.finalPrice,
                  copyItem.id
                )
                .catch((error: any) => {
                  this.alertify.presentToast(error);
                  console.error(error);
                })
                .then(() => {
                  console.log('updated');
                })
            );
          }
        }
      });
      console.log('updatePromises', updatePromises);
      this.dataProvider.pageSetting.blur = true;
      Promise.all(updatePromises)
        .then(() => {
          this.alertify.presentToast('All stock Updated Successfully');
          this.currentUpdateAction = 'balance';
          this.ngOnInit();
        })
        .catch((error: any) => {
          this.alertify.presentToast(error.message);
        })
        .finally(() => {
          this.dataProvider.pageSetting.blur = false;
        });
      inst.close();
    });
    inst.closed.subscribe((data: any) => {
      this.isActionActive = false;
    });
  }

  setTab(event: any) {
    this.currentTab = event.tab.textLabel;
  }

  duplicateItem(item: StockItem) {
    const inst = this.dialogModule.open(AddNewItemComponent, {
      data: { method: 'duplicate', data: item },
    });
    inst.componentInstance?.hideModal.subscribe((data: any) => {
      inst.close();
      this.currentUpdateAction = 'duplicateItem'
      this.ngOnInit();
    });
  }
  editItem(item: StockItem) {
    const inst = this.dialogModule.open(AddNewItemComponent, {
      data: { method: 'edit', data: item },
    });
    inst.componentInstance?.hideModal.subscribe((data: any) => {
      inst.close();
      this.currentUpdateAction = 'updateItem'
      this.ngOnInit();
    });
  }

  deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      if (id) {
        this.databaseService
          .deleteIngredient(id)
          .then((doc: any) => {
            this.alertify.presentToast('Item Deleted Successfully');
          })
          .catch((error: any) => {
            this.alertify.presentToast(error.message);
          })
          .finally(() => {
            this.currentUpdateAction = 'deleteItem'
            this.ngOnInit();
          });
      } else {
        this.alertify.presentToast('Item Not Found, Id undefined');
      }
    }
  }

  updateStockQuantities() {
    this.isActionActive = true;
    this.updateStockItems = !this.updateStockItems;
    if (this.updateStockItems) {
      this.currrentAction = 'quantity';
      this.alertify.presentToast('Update Stock Quantity Enabled');
    } else {
      let updatePromises: Promise<void>[] = [];
      const historyArray: any[] = [];
      // compare from copy to allMaterials and update the quantity
      this.copyIngredients.forEach((item: StockItem) => {
        const copyItem = this.allMaterials.find((copy) => {
          console.log(
            'item',
            copy.quantity,
            item.quantity,
            copy.id,
            item.id,
            copy.newQuantity != item.newQuantity && copy.id == item.id
          );
          return copy.newQuantity != item.newQuantity && copy.id == item.id;
        });
        console.log('copyItem', copyItem);
        if (copyItem) {
          historyArray.push({ ...item, newQuantity: copyItem.newQuantity });
          if (copyItem.id) {
            copyItem.finalPrice =
              (copyItem.quantity + copyItem.newQuantity) * copyItem.ratePerUnit;
            updatePromises.push(
              this.databaseService
                .updateIngredientQuantity(
                  copyItem.quantity + copyItem.newQuantity,
                  copyItem.finalPrice,
                  copyItem.id
                )
                .catch((error: any) => {
                  this.alertify.presentToast(error);
                  console.error(error);
                })
                .then(() => {
                  console.log('updated');
                })
            );
          }
        }
      });
      const data = {
        date: new Date(),
        items: historyArray.map((item) => {
          return item.id;
        }),
      };
      console.log('differenceItems', historyArray);
      updatePromises.push(
        this.databaseService.addStockHistory(data, historyArray)
      );
      console.log('updatePromises', updatePromises);
      this.dataProvider.pageSetting.blur = true;
      Promise.all(updatePromises)
        .then(() => {
          this.alertify.presentToast('All stock Updated Successfully');
        })
        .catch((error: any) => {
          this.alertify.presentToast(error.message);
        })
        .finally(() => {
          this.isActionActive = false;
          this.dataProvider.pageSetting.blur = false;
          this.currentUpdateAction = 'quantity';
          this.ngOnInit();
        });
      this.alertify.presentToast('Update Stock Quantity Disabled');
    }
  }

  completePurchase() {
    this.isActionActive = true;
    this.purchaseMode = !this.purchaseMode;
    if (this.purchaseMode) {
      this.currrentAction = 'purchase';
      this.alertify.presentToast('Purchase Mode Enabled');
    }
    if (!this.purchaseMode) {
      this.dataProvider.pageSetting.blur = true;
      var differenceItems: StockItem[] = [];
      let updatePromises: Promise<void>[] = [];
      // compare from copy to allMaterials and update the quantity
      this.copyIngredients.forEach((item: StockItem) => {
        const copyItem: any = this.allMaterials.find((copy) => {
          // console.log(copy.closingBalance)
          if (!copy.closingBalance) {
            copy.closingBalance = 0;
          }
          return (
            copy.id == item.id &&
            copy.newQuantity != item.newQuantity &&
            copy.newRatePerUnit > 0
          );
        });
        if (copyItem) {
          // set every undefined field to 0 in copyItem
          Object.keys(copyItem).forEach((key: any) => {
            if (copyItem[key] == undefined) {
              copyItem[key] = 0;
            }
          });
          console.log('copyItem', copyItem);
          const finalPrice =
            Number(copyItem.newQuantity) * Number(copyItem.newRatePerUnit) +
            Number(copyItem.quantity) * Number(copyItem.ratePerUnit);
          console.log('DIFF-ITEM', copyItem);
          differenceItems.push(copyItem);
          let copiedIngredient = JSON.parse(JSON.stringify(copyItem));
          copiedIngredient.quantity =
            Number(copyItem.newQuantity || 0) + Number(copyItem.quantity || 0);
          copiedIngredient.openingBalance = Number(copiedIngredient.quantity);
          copiedIngredient.ratePerUnit = Number(copyItem.newRatePerUnit);
          copiedIngredient.finalPrice = Number(finalPrice);
          copiedIngredient.newQuantity = 0;
          copiedIngredient.newRatePerUnit = 0;
          if (copyItem) {
            if (copyItem.id) {
              console.log('COPIED-ITEM', copiedIngredient);
              updatePromises.push(
                this.databaseService.updateIngredient(
                  copiedIngredient,
                  copyItem.id
                )
              );
            }
          }
        }
      });
      if (differenceItems.length > 0) {
        const data = {
          date: new Date(),
          items: differenceItems.map((item) => {
            return item.id;
          }),
        };
        console.log('differenceItems', differenceItems);
        updatePromises.push(
          this.databaseService.addPurchaseHistory(data, differenceItems)
        );
        this.dataProvider.pageSetting.blur = true;
        Promise.all(updatePromises)
          .then(() => {
            this.alertify.presentToast('All stock Updated Successfully');
            this.currentUpdateAction = 'purchase';
            this.ngOnInit();
          })
          .catch((error: any) => {
            this.alertify.presentToast(error.message);
          })
          .finally(() => {
            this.isActionActive = false;
            this.dataProvider.pageSetting.blur = false;
          });
      } else {
        this.isActionActive = false;
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('No Changes Made');
      }
      console.log('updatePromises', updatePromises, differenceItems);
    }
  }

  roundOff(value: number) {
    try {
      1;
      return value.toFixed(2);
    } catch (error) {
      return Number(value);
    }
  }

  naturalSortBy(type:'name'|'unit'|'quantity'|'ratePerUnit'|'grossValue') {
    if (type == 'name') {
      this.allMaterials.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (type == 'unit') {
      this.allMaterials.sort((a, b) => {
        return a.unit.localeCompare(b.unit);
      });
    }
    if (type == 'quantity') {
      this.allMaterials.sort((a, b) => {
        return a.quantity - b.quantity;
      });
    }
    if (type == 'ratePerUnit') {
      this.allMaterials.sort((a, b) => {
        return a.ratePerUnit - b.ratePerUnit;
      });
    }
    if (type == 'grossValue') {
      this.allMaterials.sort((a, b) => {
        return (a.finalPrice ? a.finalPrice : a.ratePerUnit * a.quantity) - (b.finalPrice ? b.finalPrice : b.ratePerUnit * b.quantity) ;
      });
    }
  }

  openScheduler(){
    const dialog = this.dialogModule.open(SchedulerComponent,{
      data:this.allMaterials
    })
    dialog.closed.subscribe(()=>{
      this.ngOnInit();
    })
  }

  setIssued(){
    const dialog = this.dialogModule.open(IssueSheetComponent,{
      data: {
        type: 'rawMaterials',
        items: this.allMaterials,
      },
    })
    dialog.closed.subscribe(()=>{
      this.ngOnInit();
    })
  }
  seeHistory(){
    const dialog = this.dialogModule.open(HistorySheetComponent,{
      data: {
        type: 'rawMaterials',
        items: this.allMaterials,
      },
    })
    dialog.closed.subscribe(()=>{
      this.ngOnInit();
    })
  }
}

export type StockItem = {
  id?: string;
  name: string;
  checked: boolean;
  touched: boolean;
  errorThreshold: number;
  warningThreshold: number;
  images: string[];
  used?: number;
  category: string;
  unit: string;
  quantity: number;
  openingBalance: number;
  closingBalance: number;
  stockUsage: number;
  ratePerUnit: number;
  newQuantity: number;
  newRatePerUnit: number;
  updatePeriod?:'Daily'|'Weekly'|'Monthly'|'Quarterly'|'Manually';
  finalPrice?: number;
};
