import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { Dish } from 'src/app/structures/dish.structure';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  animations: [
    trigger('dishCardState', [
      state('default',style({
        opacity: 1,
        scale: 1,
      })),
      state('deleted',style({
        opacity: 0,
        scale: 0,
      })),
      transition('default => deleted', animate('0.5s')),
      transition('deleted => default', animate('0.5s')),
    ]),
    trigger('dishCardStagger', [
      state('in', style({})),
      state('out', style({})),
      transition('* <=> *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter', 
          stagger(
            '50ms',
            animate(
              '0.5s ease-in',
              keyframes([
                style({
                  opacity: 0,
                  scale: 0,
                }),
                style({
                  opacity: 1,
                  scale: 1,
                }),
              ])
            )
          ),
          { optional: true }
        ),
        query(
          '.deleted',
          stagger('300ms', [
            animate(
              '500ms ease-out',
              keyframes([
                style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                style({ opacity: 0.5, transform: 'scale(.5)', offset: 0.3 }),
                style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class DishesComponent implements OnInit, OnDestroy {
  selectedIndex: number = 0;
  menuOptions: 'Dine in' | 'Zomato' | 'Swiggy' = 'Dine in';
  categories: any[];
  closeOpenMenuManager:boolean = false;
  disable: boolean = false;
  dishes: any[] = [];
  currentMenu:string = 'baseMenu';
  constructor(private router:Router,private viewContainerRef: ViewContainerRef, private dataProvider:DataProvider,private dialog:Dialog,private activatedRoute:ActivatedRoute,private databaseService:DatabaseService) {
    this.activatedRoute.params.subscribe((params:any) => {
      // this.selectedIndex = Number(params.name)
      console.log(params.dish)
      if (params.dish=='baseMenu'){
        this.dataProvider.pageSetting.title = 'Base Menu'
      } else if (params.dish=='swiggy'){
        this.dataProvider.pageSetting.title = 'Swiggy'
      } else if (params.dish=='zomato'){
        this.dataProvider.pageSetting.title = 'Zomato'
      } else if (params.dish=='parcel'){
        this.dataProvider.pageSetting.title = 'Parcel'
      } else if (params.dish=='homeDelivery'){
        this.dataProvider.pageSetting.title = 'Home Delivery'
      }  else if (params.dish=='dineIn'){
        this.dataProvider.pageSetting.title = 'Dine In'
      }
    })
  }
  openMenuManager: boolean = false;
  routerSubscription:Subscription = Subscription.EMPTY;
  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event:any)=>{
      if(event.url){
        this.disable = true;
      }
    })
    // this.databaseService.getRecipes().then((dishes) => {
    //   dishes.forEach((data:any)=>{
    //     this.dishes.push({...data.data(),id:data.id})
    //   })
    // })
    this.getCategories();
    // this.addRecipe()
  }
  delete(id: string,event:any) {
    console.log(event.deleting = true);
    setTimeout(() => {
      this.dishes = this.dishes.filter((dish) => dish.id !== id);
    }, 500);
  }
  getCategories() {
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.getRecipeCategories().then((categories) => {
      this.categories = [];
      categories.forEach((data:any)=>{
        this.categories.push({...data.data(),id:data.id})
      })
      console.log(this.categories)
      const menu = this.categories.filter((category:any) => category.connectedMenu == this.currentMenu);
      menu.forEach((data:any)=>{
        this.databaseService.getRecipes(data.id).then((dishes) => {
          dishes.forEach((data:any)=>{
            this.dishes.push({...data.data(),id:data.id})
          })
          console.log("dishes",this.dishes)
          
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        })
      })
    })
  }
  ngOnDestroy(){
    this.routerSubscription.unsubscribe();
    this.dataProvider.pageSetting.title = ''
  }
  openMenuManagement(){
    this.dataProvider.pageSetting.overlay = true;
    if (this.openMenuManager) {
      this.closeOpenMenuManager = true;
    }
    return this.openMenuManager = !this.openMenuManager
  }

  addRecipe(){
    this.dialog.open(AddRecipeComponent,{
      data:{
        menu:this.currentMenu
      }
    })
  }
}
