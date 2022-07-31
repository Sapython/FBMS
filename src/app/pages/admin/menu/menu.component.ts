
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuOptions: 'Dine in' | 'Zomato' | 'Swiggy' = 'Dine in';
  categories: string[];

  constructor() {}

  ngOnInit(): void {
    this.getCategories();
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
