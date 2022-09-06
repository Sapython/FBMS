import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-pos-table-widget',
  templateUrl: './categories-pos-table-widget.component.html',
  styleUrls: ['./categories-pos-table-widget.component.scss']
})
export class CategoriesPosTableWidgetComponent implements OnInit {

  @Input() date:string = 'Sep 4,2022'
  @Input() table:number = 1
  @Input() product:number = 1

  constructor() { }

  ngOnInit(): void {
  }

}
