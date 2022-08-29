import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dine-in',
  templateUrl: './dine-in.component.html',
  styleUrls: ['./dine-in.component.scss']
})
export class DineInComponent implements OnInit {

  dishes = [
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
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
