import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from '../providers/data.provider';
import { AlertsAndNotificationsService } from '../services/alerts-and-notifications.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  onboardingDone:boolean = false;
  constructor(private dataProvider:DataProvider,private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private router:Router) { }
  project:FormGroup = new FormGroup({
    projectName:new FormControl(),
  })
  
  mails:any[] = []
  ngOnInit(): void {
    this.addMail()
    if (this.dataProvider.userData?.email){
      this.project.controls['mail1'].setValue(this.dataProvider.userData.email)
      console.log('project',this.project.value) 
    } else {
      console.log('project',this.dataProvider.userData)
    }
  }
  addMail(){
    const control = new FormControl('',[Validators.required,Validators.email])
    this.mails.push(control)
    this.project.addControl('mail'+(this.mails.length).toString(),control)
  }
  addAccount(){
    console.log('addAccount',this.project.value)
    if (this.project.valid){
      this.dataProvider.pageSetting.blur = true;
      const data = {
        projectName:this.project.value.projectName,
        projectId:this.generateRandomId(),
        mails:this.mails.map((element:any)=>{
          return element.value
        })
      }
      console.log('data',data)
      this.databaseService.setupBusiness(data).then((doc)=>{
        this.alertify.presentToast('Account added successfully')
        this.dataProvider.currentProject = data;
        this.router.navigate(['/admin'])
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      })
    }
  }
  generateRandomId(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  removeMail(i:number){
    this.mails.splice(i,1)
    this.project.removeControl('mail'+(i+1).toString())
  }
}
