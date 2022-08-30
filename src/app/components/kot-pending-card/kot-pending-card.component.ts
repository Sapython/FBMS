import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kot-pending-card',
  templateUrl: './kot-pending-card.component.html',
  styleUrls: ['./kot-pending-card.component.scss']
})
export class KotPendingCardComponent implements OnInit {

  @Input() orderNo = 79
  @Input() tableNo = 79
  @Input() customerName = 'Rajesh Sharma'
  @Input() dishName = 'Caser Salad'
  @Input() estimatedTime =  '45 min'
  @Input() topping =  'Chix'
  @Input() extra =  'Dressing on Slide'
  @Input() timeLeft =  '6M:47S'
  @Input() status =  'In Making'

  constructor() { }

  ngOnInit(): void {
  }

}
