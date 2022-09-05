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

 tables:any = [
    {
      id: 1,
      name: 'Table 1',
      no: '1',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '2',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '3',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '4',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '5',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '6',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '7',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '8',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '9',
      color: 'success'
    },
    {
      id: 1,
      name: 'Table 1',
      no: '10',
      color: 'success'
    },
  ]


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
