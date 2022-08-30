import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRecipeComponent implements OnInit {

  ingredients:any[] = []
  options:any[] = [
    {
      title:"Choice",
      selectors:[
        {
          name:'Veg',
          value:'veg'
        },
        {
          name:'Non-Veg',
          value:'non-veg'
        },
        {
          name:'Egg',
          value:'egg'
        },
        {
          name:'Other',
          value:'other'
        },
      ]
    },
    {
      title:"Goods & Services",
      selectors:[
        {
          name:'Services',
          value:'services'
        },
        {
          name:'Goods',
          value:'goods'
        },
      ]
    }
  ]
  tags:string[] = [
    'tagOne',
    'tagTwo',
    'tagThree',
  ]
  availableOnQrMenu:boolean = false
  selectedTaxes:any;
  taxes:any[] = [
    {
      name:"Goods & Services Tax",
      taxes:[
        {
          name:'VAT',
          value:'vat'
        },
        {
          name:'GST',
          value:'gst'
        },
        {
          name:'CST',
          value:'cst'
        },
        {
          name:'SGST',
          value:'cst'
        },
        {
          name:'Other',
          value:'other'
        },
      ]
    }
  ]
  platforms:any[] = [
    {
      name:"Web",
      value:"web"
    },
    {
      name:"Mobile",
      value:"mobile"
    },
    {
      name:"Desktop",
      value:"desktop"
    },
    {
      name:"Other",
      value:"other"
    },
  ]
  orderTypes:any[] = [
    {
      name:"Take Away",
      value:"take-away"
    },
    {
      name:"Delivery",
      value:"delivery"
    },
    {
      name:"Dine In",
      value:"dine-in"
    },
    {
      name:"Other",
      value:"other"
    },
  ]
  active:any;
  favorite:any;
  constructor() { }

  ngOnInit(): void {
  }

  add(){
    console.log(this.ingredients)
  }

}
