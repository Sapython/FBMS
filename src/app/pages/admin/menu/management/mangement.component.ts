import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mangement',
  templateUrl: './mangement.component.html',
  styleUrls: ['./mangement.component.scss'],
  animations:[
    trigger('animation', [
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate('0.5s cubic-bezier(0.25, 1, 0.5, 1)',style({transform:'translateY(0%)'}))
      ])
    ])
  ]
})
export class ManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
