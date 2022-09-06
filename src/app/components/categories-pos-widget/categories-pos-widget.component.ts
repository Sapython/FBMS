import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-pos-widget',
  templateUrl: './categories-pos-widget.component.html',
  styleUrls: ['./categories-pos-widget.component.scss']
})
export class CategoriesPosWidgetComponent implements OnInit {

  @Input() id:string = 'bniewfhuieuieugfvuyhuhb'
  @Input() products:number = 24
  @Input() date:string = 'Sep 4,2022'

  constructor() { }

  ngOnInit(): void {
  }

}
