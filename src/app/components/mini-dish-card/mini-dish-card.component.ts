import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-dish-card',
  templateUrl: './mini-dish-card.component.html',
  styleUrls: ['./mini-dish-card.component.scss'],
})
export class MiniDishCardComponent implements OnInit {
  @Input() image: string;
  @Input() name: string;
  @Input() desc: string;

  constructor() {}

  ngOnInit(): void {}
}
