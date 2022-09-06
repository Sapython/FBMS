import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(public dataProvider: DataProvider) {}

  ngOnInit(): void {}

  validPath(){
    console.log("window.location.pathname",window.location.pathname)
    return true
  }
}
