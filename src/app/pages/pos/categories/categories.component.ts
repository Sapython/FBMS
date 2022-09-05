import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

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

}
