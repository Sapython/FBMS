import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent implements OnInit {
  @Input() icon: string;
  @Input() rate: number;
  @Input() key: string;
  @Input() value: string;

  constructor() {}

  ngOnInit(): void {}
}
