import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-see-booking',
  templateUrl: './see-booking.component.html',
  styleUrls: ['./see-booking.component.scss']
})
export class SeeBookingComponent implements OnInit {
  @Output() close:EventEmitter<any> = new EventEmitter<any>();
  continueBill:boolean = false;
  constructor(@Inject(DIALOG_DATA) public room:any,private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
  continueForm:FormGroup = new FormGroup({
    departureDate:new FormControl('',[Validators.required]),
  })
  ngOnInit(): void {

  }
  submit(){
    if(this.continueForm.valid){
      if (this.continueForm.value.departureDate > this.room.departureDate.toDate()){
        console.log(this.room.room.id,this.room.id,{departureDate:this.continueForm.value.departureDate})
        this.dataProvider.pageSetting.blur = true;
        this.databaseService.updateRoomBooking(this.room.room.id,this.room.id,{departureDate:this.continueForm.value.departureDate}).then((data:any)=>{
          this.alertify.presentToast("Room continued successfully")
          this.close.emit()
        }).catch((err:any)=>{
          this.alertify.presentToast(err.message)
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        })
      } else {
        this.alertify.presentToast("New Departure date must be greater than the current departure date")
      }
    } else {
      this.alertify.presentToast("Please fill all the fields")
    }
  }
  checkoutBill(){
    if (this.room.departureDate.toDate() < new Date()){
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.checkOutRoom(this.room.room.id,this.room.id).then((data:any)=>{
        this.alertify.presentToast("Room checked out successfully")
        this.close.emit()
      }).catch((err:any)=>{
        this.alertify.presentToast(err.message)
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      })
    } else {
      this.alertify.presentToast("Room can only be checked out after the departure date")
    }
  }
}
