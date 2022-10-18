import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from './providers/data.provider';
import { AuthenticationService } from './services/authentication.service';
import { RoomBillService } from './services/room-bill.service';

declare var introJs:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FBMS';
  route:string = '';
  constructor(public dataProvider: DataProvider,private authService:AuthenticationService,private router:Router,private roomBill:RoomBillService) {
    // this.dataProvider.pageSetting.blur = true;
    this.authService.user.subscribe((data:any)=>{
      console.log('user.subscribe',data)
      
      if (data==null){
        this.router.navigate(['sign-in'])
      } else {
        // this.authService.logout()
        // alert()
        this.authService.getUserData(data.uid).then((userData:any)=>{
          console.log('userData',userData)
          console.log('userData',userData.data())
          userData = userData.data();
          this.authService.getProjects().then((data:any)=>{
            console.log('projects all',data)
            if (data){
              data = data.data()
              if(data.projects && data.projects.length > 0){
                const projects = data.projects.filter((element:any) => {
                  console.log(element)
                  return element.mails.includes(userData.email);
                });
                if (projects.length > 0){
                  this.dataProvider.projects = projects;
                  if (projects.length > 1){
                    this.router.navigate(['/projectSelector'])
                  } else {
                    this.dataProvider.currentProject = projects[0];
                    this.router.navigate(['/admin']);
                  }
                } else {
                  // this.dataProvider.currentProject = projects[0];
                  alert("Please ask an admin to register a project to this email id.")
                  this.router.navigate(['sign-in']);
                  // this.router.navigate(['/onboarding']);
                }
              } else {
                this.router.navigate(['/onboarding']);
              }
            } else {
              this.router.navigate(['/onboarding']);
            }
          })
        })
      }
    })
    this.route = '';
    this.router.events.subscribe((events:any)=>{
      if (events.id){
        if (events.url != '/onboarding'){
          this.route = events.url;
          // this.dataProvider.pageSetting.overlay = false;
        }
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


  overlayClicked(){
    // this.dataProvider.pageSetting.overlay = false;
    this.dataProvider.overlayDismissed.next(true);
  }
}
