import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-menu-dish-card',
  templateUrl: './menu-dish-card.component.html',
  styleUrls: ['./menu-dish-card.component.scss'], 
})
export class MenuDishCardComponent implements OnInit {
  @Input() imageSource:string = './assets/images/dish.png';
  @Input() dishName:string = "Simple Pasta";
  @Input() dishPrice:number = 100;
  @Input() servesLeft:number = 15; 
  constructor() { }

  ngOnInit(): void {
  }

}
