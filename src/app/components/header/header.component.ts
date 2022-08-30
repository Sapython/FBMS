import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pageName: string;
  title:string;
  date:Date = new Date()
  constructor(public dataProvider:DataProvider,public authService:AuthenticationService) { }

  openProfile(){

  }
  ngOnInit(): void {
    let paths = window.location.pathname.split('/')
    this.title = paths[paths.length-1];
  }

}
