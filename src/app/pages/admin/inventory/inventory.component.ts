import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  allMaterials: StockItem[] = [];

  categories: string[] = ['rawMaterials'];
  updateStockItems: boolean = false;
  showDifferenceBalance: boolean = false;
  constructor(
    private dialogModule: Dialog,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService
  ) {}
  length: number = this.allMaterials.length;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 50, 100];
  pageEvent: any;
  currentTab: string = 'Raw Material';
  copyIngredients: StockItem[] = [];
  ngOnInit(): void {
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
        console.log('ingredients.map', item.data());
        this.allMaterials.push({ ...item.data(), id: item.id });
      });
      console.log('allMaterials', this.allMaterials);
      this.copyIngredients = JSON.parse(JSON.stringify(this.allMaterials));
      console.log('ingredients', ingredients);
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

  getIngredients(type: string) {
    return this.allMaterials.filter((item) => {
      return item.category == type;
    });
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
      this.ngOnInit();
    });
  }

  addQuantity(index: number, category: string) {
    this.getIngredients(category)[index].quantity++;
  }

  removeQuantity(index: number, category: string) {
    this.getIngredients(category)[index].quantity--;
  }

  compareOpeningClosingBalance() {
    const inst = this.dialogModule.open(BalanceSheetComponent, {
      data:{
        type:'rawMaterials',
        items:this.allMaterials
      }
    });
    inst.componentInstance!.saveOpeningBalance.subscribe((data: any) => {
      console.log('saveOpeningBalance', data);
      this.allMaterials = data;
      let updatePromises:Promise<void>[] = [];
      // compare from copy to allMaterials and update the quantity
      this.copyIngredients.forEach((item: StockItem) => {
        
        const copyItem = this.allMaterials.find(
          (copy) => {
            console.log('item', copy.quantity,item.quantity,copy.id,item.id,copy.quantity != item.quantity && copy.id == item.id);
            return copy.quantity != item.quantity && copy.id == item.id
          }
        );
        console.log('copyItem', copyItem);
        if (copyItem) {
          if(copyItem.id){
            updatePromises.push(
              this.databaseService.updateIngredientQuantity(copyItem.quantity,copyItem.id).catch((error: any) => {
                this.alertify.presentToast(error);
                console.error(error);
              }).then(() => {
                console.log('updated');
              })
            );
          }
        }
      });
      console.log('updatePromises',updatePromises);
      Promise.all(updatePromises).then(() => {
        this.alertify.presentToast('All stock Updated Successfully');
      }).catch((error:any)=>{
        this.alertify.presentToast(error.message);
      })
      inst.close();
    })
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
      this.ngOnInit();
    });
  }
  editItem(item: StockItem) {
    const inst = this.dialogModule.open(AddNewItemComponent, {
      data: { method: 'edit', data: item },
    });
    inst.componentInstance?.hideModal.subscribe((data: any) => {
      inst.close();
      this.ngOnInit();
    });
  }

  deleteItem(id: string) {
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
          this.ngOnInit();
        });
    } else {
      this.alertify.presentToast('Item Not Found, Id undefined');
    }
  }

  updateStockQuantities() {
    this.updateStockItems = !this.updateStockItems;
    if (this.updateStockItems) {
      this.alertify.presentToast('Update Stock Quantity Enabled');
    } else {
      let updatePromises:Promise<void>[] = [];
      // compare from copy to allMaterials and update the quantity
      this.copyIngredients.forEach((item: StockItem) => {
        
        const copyItem = this.allMaterials.find(
          (copy) => {
            console.log('item', copy.quantity,item.quantity,copy.id,item.id,copy.quantity != item.quantity && copy.id == item.id);
            return copy.quantity != item.quantity && copy.id == item.id
          }
        );
        console.log('copyItem', copyItem);
        if (copyItem) {
          if(copyItem.id){
            updatePromises.push(
              this.databaseService.updateIngredientQuantity(copyItem.quantity,copyItem.id).catch((error: any) => {
                this.alertify.presentToast(error);
                console.error(error);
              }).then(() => {
                console.log('updated');
              })
            );
          }
        }
      });
      console.log('updatePromises',updatePromises);
      Promise.all(updatePromises).then(() => {
        this.alertify.presentToast('All stock Updated Successfully');
      }).catch((error:any)=>{
        this.alertify.presentToast(error.message);
      })
      this.alertify.presentToast('Update Stock Quantity Disabled');
    }
  }
}

export type StockItem = {
  id?: string;
  name: string;
  checked: boolean;
  errorThreshold: number;
  warningThreshold: number;
  images: string[];
  category: string;
  unit: string;
  quantity: number;
  openingBalance: number;
  closingBalance: number;
  stockUsage: number;
  ratePerUnit: number;
};
