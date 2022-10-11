import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {

  constructor(private databaseService:DatabaseService) { }
  bookRoomForm = new FormGroup({
    guestName: new FormControl(''),
    noOfPeople: new FormControl(''),
    guestAddress: new FormControl(''),
    mobileNo: new FormControl(''),
    typeOfBooking: new FormControl(''),
    modeOfPayment:new FormControl(''),
    amount:new FormControl(''),
    arrivalDate:new FormControl(''),
    departureDate:new FormControl(''),
    aadhaarNumber:new FormControl(''),
  })
  ngOnInit(): void {
    
  }

  bookRoom(){
    
  }

}
