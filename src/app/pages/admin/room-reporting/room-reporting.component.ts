import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-room-reporting',
  templateUrl: './room-reporting.component.html',
  styleUrls: ['./room-reporting.component.scss']
})
export class RoomReportingComponent implements OnInit {
  constructor(private databaseService: DatabaseService) {}
  totalBookings: number = 0;
  totalNewGuests: number = 0;
  totalBookingCost: number = 0;
  range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  toFixed(num:number){
    return num.toFixed(2)
  }

  ngOnInit(): void {
    this.range.valueChanges.subscribe((value) => {
      if (value.start && value.end) {
        if (value.start?.getTime() == value.end?.getTime()) {
          value.end?.setHours(23);
          value.end?.setMinutes(59);
          value.end?.setSeconds(59);
        }
        
      }
    });
  }
 
}
