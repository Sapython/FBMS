import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kot-card',
  templateUrl: './kot-card.component.html',
  styleUrls: ['./kot-card.component.scss']
})
export class KotCardComponent implements OnInit {

  @Input() dishName = 'Salted Pasta With Mushroom Sauce' 
  @Input() kotId = 79
  @Input() orderType = 'Dine-in'
  @Input() billPrintDate = '11/22/2022'
  @Input() customerName = 'Rajesh Sharma'
  @Input() customerPhone =  998685869
  @Input() item =  5
  @Input() status =  'Used In Bill'
  @Input() estimatedTime =  '45 min'
  @Input() orderRecieve =  '22:55'

  constructor() { }

  ngOnInit(): void {
  }

}
