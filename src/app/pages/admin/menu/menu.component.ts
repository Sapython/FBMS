import {
  animate,
  animateChild,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SideFlowComponent } from 'src/app/components/side-flow/side-flow.component';
import { DataProvider } from 'src/app/providers/data.provider';
import { Dish } from 'src/app/structures/dish.structure';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ManagementComponent } from './management/mangement.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  
  features = [
    {
      feature_Name:'Base Menu',
      button_Name:'Manage',
      src:'assets/menu1.png',
      link:'baseMenu'
    },
    {
      feature_Name:'Swiggy',
      button_Name:'Manage',
      src:'assets/menu2.png',
      link:'swiggy'
    },
    {
      feature_Name:'Zomato',
      button_Name:'Manage',
      src:'assets/menu3.png',
      link:'zomato'
    },
    {
      feature_Name:'Parcel',
      button_Name:'Manage',
      src:'assets/menu4.png',
      link:'parcel'
    },
    {
      feature_Name:'Home Delivery',
      button_Name:'Manage',
      src:'assets/menu5.png',
      link:'homeDelivery'
    },
    {
      feature_Name:'Dine In',
      button_Name:'Manage',
      src:'assets/menu6.png',
      link:'dineIn'
    },
  ]
  categories:any[] = [];

  editCategory(index:number){

  }
}
