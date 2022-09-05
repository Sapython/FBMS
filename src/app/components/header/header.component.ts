import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 path:any =window.location.pathname.split('/')[2];

  constructor() { }

  ngOnInit(): void {

    console.log(this.path);
  }

}
