import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import Fuse from 'fuse.js';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddRecipeComponent implements OnInit {
  ingredients: any[] = [];
  options: any[] = [
    {
      title: 'Choice',
      selectors: [
        {
          name: 'Veg',
          value: 'veg',
        },
        {
          name: 'Non-Veg',
          value: 'non-veg',
        },
        {
          name: 'Egg',
          value: 'egg',
        },
        {
          name: 'Other',
          value: 'other',
        },
      ],
    },
    {
      title: 'Goods & Services',
      selectors: [
        {
          name: 'Services',
          value: 'services',
        },
        {
          name: 'Goods',
          value: 'goods',
        },
      ],
    },
  ];
  tags: string[] = ['tagOne', 'tagTwo', 'tagThree'];
  availableOnQrMenu: boolean = false;
  selectedTaxes: any;
  taxes: any[] = [
    {
      name: 'VAT',
      value: 'vat',
    },
    {
      name: 'GST',
      value: 'gst',
    },
    {
      name: 'CST',
      value: 'cst',
    },
    {
      name: 'SGST',
      value: 'cst',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ];
  platforms: any[] = [
    {
      name: 'Web',
      value: 'web',
    },
    {
      name: 'Mobile',
      value: 'mobile',
    },
    {
      name: 'Desktop',
      value: 'desktop',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ];
  orderTypes: any[] = [
    {
      name: 'Take Away',
      value: 'take-away',
    },
    {
      name: 'Delivery',
      value: 'delivery',
    },
    {
      name: 'Dine In',
      value: 'dine-in',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ];
  files: {
    file: File;
    url: SafeUrl;
    type?: 'preloaded' | undefined;
    onlineUrl?: string;
  }[] = [];
  imageAcceptedFiles: string[] = ['image/jpeg', 'image/png'];
  categories: any[] = [];
  active: any;
  favorite: any;
  ingredientFuse: any;
  filteredIngredients: any[] = [];
  selectedIngredients: any[] = [];
  cookingCost: number = 0;
  sellingCost: number = 0;
  costPercentage: number = 1;

  recipeForm: FormGroup = new FormGroup({
    dishName: new FormControl(),
    categories: new FormControl(),
    costPrice: new FormControl(this.cookingCost),
    sellingPrice: new FormControl(this.sellingCost),
    profitMargin: new FormControl(this.costPercentage),
    onlinePrice: new FormControl(this.sellingCost),
    shopPrice: new FormControl(this.sellingCost),
    thirdPartyPrice: new FormControl(this.sellingCost),
    tags: new FormControl(this.tags),
    orderType: new FormControl(),
    additionalInstructions: new FormControl(),
  });

  constructor(
    private databaseService: DatabaseService,
    private sanitizer: DomSanitizer,
    private alertify: AlertsAndNotificationsService,
    @Inject(DIALOG_DATA) public dialogData: any,
    private dataProvider: DataProvider
  ) {}
  ngOnInit(): void {
    this.databaseService.getIngredients().then((res) => {
      res.forEach((element: any) => {
        console.log(element.data());
        this.ingredients.push({ ...element.data(), id: element.id, amount: 1 });
      });
      // use fuse js
      const options = {
        shouldSort: true,
        threshold: 0.6,
        keys: ['name', 'unit', 'ratePerUnit', 'quantity'],
      };
      this.ingredientFuse = new Fuse(this.ingredients, options);
    });
    this.databaseService.getRecipeCategories().then((res) => {
      res.forEach((element: any) => {
        if (element.data().connectedMenu == this.dialogData.menu) {
          this.categories.push({ ...element.data(), id: element.id });
          console.log({ ...element.data(), id: element.id });
        }
      });
    });
  }
  search(event: any) {
    const res = this.ingredientFuse.search(event.target.value);
    console.log(res);
    this.filteredIngredients = res.map((item: any) => item.item);
  }
  add() {
    console.log(this.ingredients);
  }

  calculateFullPrice() {
    this.cookingCost = 0;
    this.sellingCost = 0;
    this.selectedIngredients.forEach((ingredient: any) => {
      this.cookingCost += ingredient.amount * ingredient.ratePerUnit;
    });
    this.sellingCost = Math.ceil(
      (this.cookingCost * 100) / this.costPercentage
    );
    console.log(
      'test',
      this.cookingCost,
      this.sellingCost,
      this.costPercentage
    );
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }
  addFile(file: FileList) {
    console.log(file);
    let problem = false;
    let files = Array.from(file);
    files.forEach((data) => {
      console.log(data);
      if (this.imageAcceptedFiles.includes(data.type)) {
        this.files.push({
          file: data,
          url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data)),
        });
      } else {
        problem = true;
      }
    });
    if (problem) {
      this.alertify.presentToast('Only jpeg and png files are allowed');
    }
    // this.recipeForm.controls['images'].setValue(this.files);
  }

  async submit() {
    if (!this.recipeForm.valid){
      this.alertify.presentToast('Please fill all the required fields');
      return;
    }
    this.dataProvider.pageSetting.blur = true;
    const uploadedImages: string[] = [];
    for (const file of this.files) {
      if (file.type == 'preloaded') {
        uploadedImages.push(file.onlineUrl || '');
      } else {
        uploadedImages.push(
          await this.databaseService.upload(
            'business/accounts/' +
              this.dataProvider.currentProject?.projectId +
              '/recipes/recipes/' +
              new Date().toISOString() +
              file.file.name,
            file.file
          )
        );
      }
    }
    const data = {
      ...this.recipeForm.value,
      ingredients: this.selectedIngredients,
      images: uploadedImages,
      taxes: this.taxes.filter((tax) => tax.checked),
      platforms: this.platforms.filter((platform) => platform.checked),
      availableOnQrMenu: this.availableOnQrMenu,
    };
    console.log(data);
    if(confirm('Are you sure you want to add this recipe?')){
      this.databaseService.addRecipe(data).then((res) => {
        this.alertify.presentToast('Recipe added successfully');
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      })
    }
  }
}
