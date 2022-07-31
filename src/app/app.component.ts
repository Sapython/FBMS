import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from './providers/data.provider';
import { AuthenticationService } from './services/authentication.service';

declare var introJs:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FBMS';
  route:string = '';
  constructor(public dataProvider: DataProvider,private authService:AuthenticationService,private router:Router) {
    this.authService.user.subscribe((data:any)=>{
      if (data==null){
        this.router.navigate(['sign-in'])
      } else {
        const route = localStorage.getItem('route')
        if (route!=undefined && route!=null){
          this.router.navigateByUrl(route)
        } else {
          this.router.navigate(['admin'])
        }
      }
    })
    this.router.events.subscribe((events:any)=>{
      if (events.id){
        this.route = events.url;
      }
    })
    setInterval(()=>{
      if (localStorage.getItem('route')!=this.route){
        localStorage.setItem('route',this.route)
      }
    },2000)
  }

  ngOnInit(): void {
    
    console.log(introJs)
  }
}
