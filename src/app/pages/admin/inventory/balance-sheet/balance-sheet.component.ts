import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { StockItem } from '../inventory.component';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {

  constructor(@Inject(DIALOG_DATA) public items: {type:'rawMaterials'|'consumables',items:StockItem[]}) { }

  ngOnInit(): void {
  }

  addQuantity(index:number){
    if (this.items.type=='consumables'){
      this.items.items[index].quantity++;
    } else {
      this.items.items[index].quantity++;
    }
  }

  removeQuantity(index:number){
    if (this.items.type=='consumables'){
      if (this.items.items[index].quantity>0){
        this.items.items[index].quantity--;
      }
    } else {
      if (this.items.items[index].quantity>0){
        this.items.items[index].quantity--;
      }
    }
  }

}
