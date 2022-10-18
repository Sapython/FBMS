import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AddGuestComponent } from '../add-guest/add-guest.component';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {
  @Output() cancel:EventEmitter<any> = new EventEmitter<any>();
  numberOfGuests:number = 0;
  constructor(private databaseService:DatabaseService,private dataProvider:DataProvider,private dialog:Dialog, @Inject(DIALOG_DATA) public room:any,private alertify:AlertsAndNotificationsService) { }
  bookRoomForm = new FormGroup({
    typeOfBooking: new FormControl(''),
    modeOfPayment:new FormControl(''),
    incomingPlatform:new FormControl(''),
    transactionId:new FormControl(''),
    amount:new FormControl(''),
    arrivalDate:new FormControl(''),
    departureDate:new FormControl(''),
  })
  guestList:any[] = [];
  genList(num:number){
    return Array(num);
  }

  filteredOptions: string[] = [];
  ngOnInit(): void {
    
  }

  bookRoom(){
    if (this.bookRoomForm.valid && this.guestList.length >0){
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.bookGuestRoom(this.room.id,{...this.bookRoomForm.value,guests:this.guestList,room:this.room}).then((data:any)=>{
        this.cancel.emit()
        this.alertify.presentToast("Room booked successfully")
      }).catch((err:any)=>{
        this.alertify.presentToast(err.message)
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      })
    }
  }

  addGuestModal(){
    const inst = this.dialog.open(AddGuestComponent)
    inst.componentInstance?.close.subscribe((data:any)=>{
      console.log(data)
      if(data){
        this.guestList.push(data)
      }
      inst.close()
    })
    inst.disableClose = true;
    inst.backdropClick.subscribe(()=>{
      if (confirm("Are you sure you want to cancel add user?")) {
        inst.close()
      }
    })
  }

  removeGuest(i:number){
    this.guestList.splice(i,1)
  }

}
