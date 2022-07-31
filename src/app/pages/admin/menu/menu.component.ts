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
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/structures/dish.structure';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
export class MenuComponent implements OnInit, OnDestroy {
  menuOptions: 'Dine in' | 'Zomato' | 'Swiggy' = 'Dine in';
  categories: string[];
  disable: boolean = false;
  dishes: Dish[] = [
    {
      id: '1',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '2',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '3',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '4',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '5',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '6',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '7',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '8',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '9',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
    {
      id: '10',
      image: './assets/images/dish.png',
      name: 'Simple Pasta',
      price: 100,
      servesLeft: 15,
    },
  ];
  constructor(private router:Router) {}
  routerSubscription:Subscription = Subscription.EMPTY;
  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event:any)=>{
      if(event.url){
        this.disable = true;
      }
    })
    this.getCategories();
  }
  delete(id: string,event:any) {
    console.log(event.deleting = true);
    setTimeout(() => {
      this.dishes = this.dishes.filter((dish) => dish.id !== id);
    }, 500);
  }
  getCategories() {
    this.categories = [
      'Hot Dishes',
      'Cold Dishes',
      'Soup',
      'Grill',
      'Appetizer',
      'Dessert',
    ];
  }
  ngOnDestroy(){
    this.routerSubscription.unsubscribe();
  }
}
