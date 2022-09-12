import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

declare var introJs:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orderTypeMenuValue: 'Today' | 'This Week' | 'This Month' | 'This Year' =
    'Today';
  ordersDeliveredMenuValue: 'This Week' | 'This Month' | 'This Year' =
    'This Week';
  mostOrderedMenuValue: 'Today' | 'This Week' | 'This Month' | 'This Year' =
    'Today';
  salesMenuValue: 'This Week' | 'This Month' | 'This Year' = 'This Week';

  mostOrderedDishes: {
    image: string;
    name: string;
    noOfOrders: number;
  }[] = [];
  pendingOrders: {
    image: string;
    name: string;
    table: string;
  }[];
  topSellingOrders: {
    image: string;
    name: string;
    noOfOrders: string;
  }[];
  reservations: {
    id: string;
    photo: string;
    name: string;
    phone: string;
    table: string;
    order: {
      name: string;
      quantity: number;
    }[];
    time: Timestamp;
    payment: number;
    status: 'Completed' | 'Pending' | 'In Progress';
  }[];

  constructor() {}

  ngOnInit(): void {
    this.getMostOrderedDishes();
    this.getPendingOrders();
    this.getTopSellingOrders();
    this.getReservations();
    // introJs().setOptions({
    //   steps: [{
    //     intro: "Here you will see your total revenue per month!"
    //   }, {
    //     element: document.querySelector('#step1'),
    //     intro: "Start the intro to dashboard!"
    //   }]
    // }).start();
  }

  getMostOrderedDishes() {
    this.mostOrderedDishes = [
      {
        image:
          'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Pancakes',
        noOfOrders: 29,
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Pizza',
        noOfOrders: 25,
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Egg Salad',
        noOfOrders: 21,
      },
    ];
  }

  getPendingOrders() {
    this.pendingOrders = [
      {
        image:
          'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Pancakes',
        table: 'Dining, T29',
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Pizza',
        table: 'Dining, T25',
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Egg Salad',
        table: 'Dining, T21',
      },
      {
        image:
          'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Pancakes',
        table: 'Dining, T29',
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Pizza',
        table: 'Dining, T25',
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Egg Salad',
        table: 'Dining, T21',
      },
    ];
  }

  getTopSellingOrders() {
    this.topSellingOrders = [
      {
        image:
          'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Pancakes',
        noOfOrders: 'Dining, T29',
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Pizza',
        noOfOrders: 'Dining, T25',
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Egg Salad',
        noOfOrders: 'Dining, T21',
      },
      {
        image:
          'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Pancakes',
        noOfOrders: 'Dining, T29',
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Pizza',
        noOfOrders: 'Dining, T25',
      },
      {
        image:
          'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Egg Salad',
        noOfOrders: 'Dining, T21',
      },
    ];
  }
  
  getReservations() {
    this.reservations = [
      {
        id: '1',
        photo: 'https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Amal Malik',
        phone: '9898989898',
        table: 'T14',
        order: [
          {
            name: 'Puri Sabji',
            quantity: 2
          }
        ],
        time: Timestamp.now(),
        payment: 1400,
        status: 'Completed'
      },
      {
        id: '1',
        photo: 'https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Amal Malik',
        phone: '9898989898',
        table: 'T14',
        order: [
          {
            name: 'Puri Sabji',
            quantity: 2
          },
          {
            name: 'Chole Bhature',
            quantity: 3
          }
        ],
        time: Timestamp.now(),
        payment: 1400,
        status: 'Pending'
      },
      {
        id: '1',
        photo: 'https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Amal Malik',
        phone: '9898989898',
        table: 'T14',
        order: [
          {
            name: 'Puri Sabji',
            quantity: 2
          }
        ],
        time: Timestamp.now(),
        payment: 1400,
        status: 'In Progress'
      },
    ];
  }
}
