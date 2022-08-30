import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  rawMaterials:StockItem[] = [
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
  ]

  consumables:StockItem[] = [
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
    {
      id:'231',
      name: 'Item 1',
      checked: false,
      quantity: 15,
      images: ['https://picsum.photos/200/300?random=1'],
      unit: 'unit',
      openingBalance: 0,
      closingBalance: 0,
      stockUsage: 0,
      ratePerUnit:23,
    },
  ]

  updateStockItems:boolean = false;
  showDifferenceBalance:boolean = false;
  constructor(private dialogModule:Dialog) { }
  length:number = this.rawMaterials.length;
  pageSize:number = 10;
  pageSizeOptions = [10, 20, 50, 100];
  pageEvent:any;
  currentTab:string = 'Raw Material';
  ngOnInit(): void {
  }

  changeOcurred(){}

  editRecipe(recipe:StockItem){
    this.dialogModule.open(UpdateStockComponent,{
      data:recipe
    })
    // modal.ins
  }

  addNewItem(){
    this.dialogModule.open(AddNewItemComponent,{
      data:{}
    })
  }


  addQuantity(index:number,data:'rawMaterials'|'consumables'){
    if (data=='consumables'){
      this.consumables[index].quantity++;
    } else {
      this.rawMaterials[index].quantity++;
    }
  }

  removeQuantity(index:number,data:'rawMaterials'|'consumables'){
    if (data=='consumables'){
      this.consumables[index].quantity--;
    } else {
      this.rawMaterials[index].quantity--;
    }
  }

  compareOpeningClosingBalance(){
    this.dialogModule.open(BalanceSheetComponent,{
      data:{
        items:this.rawMaterials,
        type:'rawMaterials'
      }
    })
  }

  setTab(event:any){
    this.currentTab = event.tab.textLabel;
  }
}

export type StockItem = {
  id?:string;
  name: string;
  checked: boolean;
  images:string[];
  unit:string;
  quantity:number;
  openingBalance:number;
  closingBalance:number;
  stockUsage:number;
  ratePerUnit:number;
}