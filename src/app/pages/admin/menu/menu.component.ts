import {
  animate,
  animateChild,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/structures/dish.structure';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('dishCardStagger', [
      transition('* => *', [
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
          ':leave',
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
export class MenuComponent implements OnInit {
  menuOptions: 'Dine in' | 'Zomato' | 'Swiggy' = 'Dine in';
  categories: string[];
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
  constructor() {}

  ngOnInit(): void {
    this.getCategories();
  }
  delete(id: string) {
    this.dishes = this.dishes.filter((dish) => dish.id !== id);
  }
  getCategories() {
    this.categories = [
      'Hot Dishes',
      'Cold Dishes',
      'Soup',
      'Grill',
      'Apperizer',
      'Dessert',
    ];
  }
}
