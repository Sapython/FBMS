import { Component, Input, OnInit } from '@angular/core';
import { slot } from 'src/app/structures/time-slot.structure';

@Component({
  selector: 'app-booked-table-card',
  templateUrl: './booked-table-card.component.html',
  styleUrls: ['./booked-table-card.component.scss'],
})
export class BookedTableCardComponent implements OnInit {
  @Input() number: number;
  @Input() name: string;
  @Input() slot: slot;
  @Input() guests: number;

  constructor() {}

  ngOnInit(): void {}
}
