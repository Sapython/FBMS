import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kot-details-card',
  templateUrl: './kot-details-card.component.html',
  styleUrls: ['./kot-details-card.component.scss']
})
export class KotDetailsCardComponent implements OnInit {

  @Input() tableNo = 'C34'
  @Input() waiterName = 'Sujit'
  @Input() id = '#579'
  @Input() dishName = 'Caser Salad'
  @Input() peopleOdered =  4
  @Input() topping =  'Chix'
  @Input() extra =  'Dressing on Slide'
  @Input() timeLeft =  '6M:47S'
  @Input() time =  '10:34 PM'
  @Input() delivery:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
