import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.scss']
})
export class AddRoomsComponent implements OnInit {
  active:boolean = false;
  ingredients:any[] = []
  options:any[] = []
  title:string = 'Add Table'
  files:any[] = []
  @Output() closeModal:EventEmitter<any> = new EventEmitter<any>()
  constructor(private sanitizer:DomSanitizer,private alertify:AlertsAndNotificationsService,private databaseService:DatabaseService,private dataProvider:DataProvider, @Inject(DIALOG_DATA) public dialogData:any) { }
  imageAcceptedFiles:string[] = [
    'image/jpeg',
    'image/png'
  ]
  roomForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    tableNo: new FormControl('',[Validators.required]),
    maxOccupancy: new FormControl(''),
  })
  ngOnInit(): void {
    if(this.dialogData.method=='edit'){
      this.title='Edit Room'
      this.roomForm.patchValue(this.dialogData.category)
      this.active = this.dialogData.category.isActive
    }
  }

  async addRoom(){
    console.log(this.roomForm.value);
    if (this.roomForm.valid){
      console.log(this.roomForm.value);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.addRoom({...this.roomForm.value,booked:false}).then((res:any)=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Room Added Successfully')
        this.closeModal.emit()
      }).catch((err:any)=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Error Adding Room','error')
      })
    } else {
      this.alertify.presentToast('Please fill all the fields')
    }
  }
}