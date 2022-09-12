import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { AddMainCategoryComponent } from './add-main-category/add-main-category.component';
import { AddTaxComponent } from './add-tax/add-tax.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  features = [
    {
      feature_Name: 'Base Menu',
      button_Name: 'Manage',
      src: 'assets/menu1.png',
      link: 'baseMenu',
    },
    {
      feature_Name: 'Swiggy',
      button_Name: 'Manage',
      src: 'assets/menu2.png',
      link: 'swiggy',
    },
    {
      feature_Name: 'Zomato',
      button_Name: 'Manage',
      src: 'assets/menu3.png',
      link: 'zomato',
    },
    {
      feature_Name: 'Parcel',
      button_Name: 'Manage',
      src: 'assets/menu4.png',
      link: 'parcel',
    },
    {
      feature_Name: 'Home Delivery',
      button_Name: 'Manage',
      src: 'assets/menu5.png',
      link: 'homeDelivery',
    },
    {
      feature_Name: 'Dine In',
      button_Name: 'Manage',
      src: 'assets/menu6.png',
      link: 'dineIn',
    },
  ];
  subcategories: SubCategory[] = [];
  categories: Category[] = [];
  taxes: Tax[] = [];
  discounts: Discount[] = []

  constructor(
    private dialog: Dialog,
    private databaseService: DatabaseService
  ) {}
  length: number = this.subcategories.length;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 50, 100];
  pageEvent: any;
  multiSelector: boolean = false;

  ngOnInit() {
    this.getRecipes();
    this.getTaxes();
    this.getDiscounts();
    this.getMainCategories();
  }
  getMainCategories(){
    this.databaseService.getMainCategories().then((data: any) => {
      // console.log("Main Categoris",data.data().categories)
      // this.categories = data.data().categories;
      this.categories = [];
      data.forEach((element: any) => {
        this.categories.push({ ...element.data(), id: element.id });
      });
    });
  }
  getSubCategoryName(id: string) {
    let name = '';
    this.subcategories.forEach((element) => {
      if (element.id == id) {
        name = element.name;
      }
    });
    return name;
  }
  getRecipes() {
    this.databaseService.getRecipeCategories().then((data: any) => {
      this.subcategories = [];
      console.log('getIngredientCategories', data);
      data.forEach((element: any) => {
        this.subcategories.push({ ...element.data(), id: element.id });
      });
    });
  }

  getTaxes() {
    this.taxes = [];
    this.databaseService.getTaxes().then((data: any) => {
      this.taxes = [];
      console.log('getIngredientCategories', data);
      data.forEach((element: any) => {
        this.taxes.push({ ...element.data(), id: element.id });
      });
    });
  }

  getDiscounts() {
    this.databaseService.getDiscounts().then((data: any) => {
      this.discounts = [];
      console.log('getIngredientCategories', data);
      data.forEach((element: any) => {
        this.discounts.push({ ...element.data(), id: element.id });
      });
    });
  }

  tabChanged() {
    this.multiSelector = false;
  }
  addDiscount() {
    const inst = this.dialog.open(AddDiscountComponent, {
      data: {
        method: 'add',
      },
    });
    inst.componentInstance?.closeModal.subscribe((data: any) => {
      this.getDiscounts();
      inst.close()
    });
  }
  editDiscount(discount: Discount) {
    const inst = this.dialog.open(AddDiscountComponent, {
      data: {
        method: 'edit',
        discount: discount,
      },
    });
    inst.componentInstance?.closeModal.subscribe((data: any) => {
      this.getDiscounts();
      inst.close()
    });
  }
  editCategory(category: SubCategory) {
    const inst = this.dialog.open(AddCategoryComponent, {
      data: {
        method: 'edit',
        category: category,
      },
    });
    inst.componentInstance?.closeModal.subscribe((data: any) => {
      this.getRecipes();
      inst.close()
    });
  }

  addCategory() {
    const inst = this.dialog.open(AddCategoryComponent, {
      data: {
        method: 'add',
      },
    });
    inst.componentInstance?.closeModal.subscribe((data: any) => {
      this.getRecipes();
      inst.close()
    });
  }

  editTax(tax: Tax) {
    const inst = this.dialog.open(AddTaxComponent, {
      data: {
        method: 'edit',
        tax: tax,
        id: tax.id,
      },
    });
    inst.componentInstance?.closeModal.subscribe((data: any) => {
      inst.close();
      this.getTaxes();
    });
  }

  addTax() {
    const inst = this.dialog.open(AddTaxComponent, {
      data: {
        method: 'add',
        taxes: this.taxes,
      },
    });
    inst.componentInstance?.closeModal.subscribe((data: any) => {
      inst.close();
      this.getTaxes();
    });
  }
  toDate(ts: any) {
    console.log('Timestamp', ts);
    return ts;
  }

  addMainCategory() {
    const inst = this.dialog.open(AddMainCategoryComponent, {
      data: {
        method: 'add',
        subcategories:this.subcategories
      },
    })
    inst.componentInstance?.closeModal.subscribe((data: any) => {
      inst.close();
      this.getMainCategories();
    });
  }
  editMainCategory(category:any){
    const inst = this.dialog.open(AddMainCategoryComponent, {
      data: {
        method: 'edit',
        category: category,
        subcategories:this.subcategories
      },
    })
    inst.componentInstance?.closeModal.subscribe((data: any) => {
      inst.close();
      this.getMainCategories();
    });
  }

  deleteMainCategory(category:any){
    this.databaseService.deleteMainCategory(category.id).then(()=>{
      this.getMainCategories();
    })
  }
}

export type SubCategory = {
  id?: string;
  name: string;
  displayName: string;
  discountList: string;
  status: string;
  created: any;
  modified: any;
  checked: boolean;
};

export type Tax = {
  id?: string;
  name: string;
  displayName: string;
  taxType: string;
  priceType: string;
  amount: number;
  status: string;
  order: boolean;
  created: any;
  checked: boolean;
};

export type Discount = {
  title: string;
  startPrice: number;
  endPrice: number;
  startDate: any;
  endDate: any;
  startTime: any;
  endTime: any;
  discountType:'percentage' | 'flat';
  discountValue: number;
  maxDiscount: number;
  days: string[];
  discountCode: string;
  checked: boolean;
  active: boolean;
};
export type Category = {
  id?: string;
  name:string;
  subCategories: string[];
  checked: boolean;
  created: any;
  modified: any;
}