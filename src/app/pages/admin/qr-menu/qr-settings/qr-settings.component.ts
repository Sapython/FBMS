import { Dialog } from '@angular/cdk/dialog';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-qr-settings',
  templateUrl: './qr-settings.component.html',
  styleUrls: ['./qr-settings.component.scss']
})
export class QrSettingsComponent implements OnInit {
  imageFile:File | undefined;
  imageUrl:any;
  @Output() close:EventEmitter<any> = new EventEmitter();
  constructor(private databaseService:DatabaseService,private dilaog:Dialog,private dataProvider:DataProvider,private alertify:AlertsAndNotificationsService) { }
  qrMenuConfig:FormGroup = new FormGroup({
    pageTitle:new FormControl('',[Validators.required]),
    pageSubtitle:new FormControl('',[Validators.required]),
    startTime:new FormControl('',[Validators.required]),
    endTime:new FormControl('',[Validators.required]),
    logo:new FormControl(''),
  })
  ngOnInit(): void {
    this.databaseService.getQrSettings().then((data:any)=>{
      this.qrMenuConfig.patchValue(data.data())
      this.imageUrl = data.data().logo;
    })
  }

  setFile(event:any){
    console.log(event.target.files[0])
    // verify if the file is an image file and size is less than 1mb
    this.imageFile = event.target.files[0];
    if (!this.imageFile?.type.includes('image') || this.imageFile?.size > 1000000){
      this.alertify.presentToast('Please select an image file','error')
      this.imageFile = undefined;
      event.target.files = null;
    }
  }

  async saveData(){
    this.dataProvider.pageSetting.blur = true;
    if (this.imageFile){
      // verify if the file is an image file and size is less than 1mb
      if (this.imageFile.type.includes('image') && this.imageFile.size < 1000000){
        this.databaseService.upload('businesses/'+this.dataProvider.currentProject.projectId+'/'+this.imageFile.name,this.imageFile).then((data:any)=>{
          console.log(data)
          this.setData({logo:data})
        })
      }else{
        this.alertify.presentToast('Please select an image file','error')
      }
    } else {
      this.setData()
    }
  }

  setData(extras?:any){
    this.databaseService.setQrSettings({...this.qrMenuConfig.value,...extras}).then(()=>{
      this.alertify.presentToast('Data saved successfully','info')
    }).catch((error)=>{
      this.alertify.presentToast('Some Error occurred','error')
    })
    .finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

}
