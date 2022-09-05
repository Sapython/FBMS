import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() type: string = 'Test'
  @Input() price: string = '1211'

  constructor() { }

  ngOnInit(): void {
  }

  widgets = [
    {
      id: 'bniewfhuieuieugfvuyhuhb',
      products: 24,
      date: 'Sep 4,2022',
    },
    {
      id: 'bniewfhuieuieugfvuyhuhb',
      products: 24,
      date: 'Sep 4,2022',
    },
    {
      id: 'bniewfhuieuieugfvuyhuhb',
      products: 24,
      date: 'Sep 4,2022',
    },
    {
      id: 'bniewfhuieuieugfvuyhuhb',
      products: 24,
      date: 'Sep 4,2022',
    },
    {
      id: 'bniewfhuieuieugfvuyhuhb',
      products: 24,
      date: 'Sep 4,2022',
    },
  ]
}
