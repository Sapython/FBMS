import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
import { NewUserComponent } from './new-user/new-user.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  users:any[] = [
    {
      image:"https://i.pravatar.cc/150?img=1",
      name:"Person",
      email:"person1@gmail.com",
      role:"Admin",
      id:"89df7s9d8f79sd87f"
    },
    {
      image:"https://i.pravatar.cc/150?img=2",
      name:"Person2",
      email:"person2@gmail.com",
      role:"Admin",
      id:"89df7s9d8f79sd87f"
    },
    {
      image:"https://i.pravatar.cc/150?img=3",
      name:"Saptam",
      email:"saptampro2003@gmail.com",
      role:"Admin",
      id:"89df7s9d8f79sd87f"
    },
    {
      image:"https://i.pravatar.cc/150?img=4",
      name:"Shivam",
      email:"shivamgupta@gmail.com",
      role:"Admin",
      id:"89df7s9d8f79sd87f"
    },
  ]
  constructor(private dialog:MatDialog,private dataProvider:DataProvider) { }

  ngOnInit(): void {
  }

  createNewUser(){
    const dialog = this.dialog.open(NewUserComponent,{
      data:this.dataProvider.currentProject
    })
    dialog.componentInstance.close.subscribe((data)=>{
      dialog.close();
    });
  }

  openSettings(user:any){
    const dialog = this.dialog.open(SettingsComponent,{
      data:user
    })
    dialog.componentInstance.close.subscribe((data)=>{
      dialog.close();
    });
    
  }

}
