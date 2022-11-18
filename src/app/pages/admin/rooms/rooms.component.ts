import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { slot, timeSlots } from 'src/app/structures/time-slot.structure';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { GuestsComponent } from './guests/guests.component';
import { RoomSettingsComponent } from './room-settings/room-settings.component';
import { SeeBookingComponent } from './see-booking/see-booking.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  viewBookedTables: boolean = false;
  timeSlots: slot[] = timeSlots;

  selectedDate: Date = new Date();
  selectedSlot: slot;

  showCalendar: boolean = false;
  showSlots: boolean = false;
  rooms: any[] = [];
  constructor(
    private databaseService: DatabaseService,
    private dialog: Dialog,
    private dataProvider:DataProvider,
    private alertify:AlertsAndNotificationsService
  ) {
    // alert("Rooms MOdule")
  }
  tableSubscription: Subscription = Subscription.EMPTY;

  addTable() {
    this.dialog.open(AddRoomsComponent);
  }
  guestsSubscription: Subscription = Subscription.EMPTY;
  ngOnInit(): void {
    this.guestsSubscription.unsubscribe();
    this.guestsSubscription = this.databaseService
      .getGuests()
      .subscribe((data: any) => {
        console.log(data);
        let guests:any[] =[]
        data.forEach((dt:any) => {
          console.log("GUEST",dt.data())
          guests.push(dt.data())
        });
        this.dataProvider.guests = guests;
        // this.rooms = data;
      });
    this.databaseService.getRooms().subscribe((tables: any) => {
      this.rooms = tables;
      console.log('rooms', tables);
    });
    // By default, select the most recent slot
    const now = new Date();
    this.selectedSlot =
      timeSlots.find((slot) => {
        const start = slot.split('-')[0];
        const amOrPm = start.match(/AM|PM+/g)![0];
        var startHour = parseInt(start.match(/\d+/g)![0]);
        if (amOrPm == 'PM' && startHour != 12) {
          startHour = startHour + 12;
        }
        if (startHour == now.getHours()) {
          return true;
        }
        return false;
      }) || timeSlots[0];

    // Hide dropdowns (if open) on any outside click
    document.addEventListener('click', (event: Event) => {
      const calendarDropdown = document.getElementById('calendar-dropdown');
      if (
        calendarDropdown &&
        event.target &&
        !calendarDropdown.contains(event.target as Node)
      ) {
        this.showCalendar = false;
      }
      const slotsDropdown = document.getElementById('slots-dropdown');
      if (
        slotsDropdown &&
        event.target &&
        !slotsDropdown.contains(event.target as Node)
      ) {
        this.showSlots = false;
      }
    });
  }

  bookRoom(table: any) {
    console.log('book room', table);
    // this.databaseService.bookRoom()
    const inst = this.dialog.open(BookRoomComponent,{data:table});

    inst.componentInstance?.cancel.subscribe(()=>{
      inst.close();
    })
    inst.disableClose = true;
    inst.backdropClick.subscribe(()=>{
      if (confirm("Are you sure you want to cancel booking?")) {
        inst.close()
      }
    })
  }

  editRoom(table:any){
    const inst = this.dialog.open(AddRoomsComponent,{data:{method:'edit',data:table}});
    inst.componentInstance?.closeModal.subscribe(()=>{
      inst.close();
    })
    inst.disableClose = true;
    inst.backdropClick.subscribe(()=>{
      if (confirm("Are you sure you want to cancel edit?")) {
        inst.close()
      }
    })
  }

  seeBooking(table:any){
    console.log("see booking",table)
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.getRoomBooking(table.id,table.roomBookingId).then((data:any)=>{
      this.dialog.open(SeeBookingComponent,{data:{...data.data(),id:table.roomBookingId}})
    }).catch((error)=>{
      console.log(error)
      this.alertify.presentToast("Error fetching booking details",'error')
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

  ngOnDestroy() {
    this.guestsSubscription.unsubscribe();
  }

  seeGuests(){
    const inst = this.dialog.open(GuestsComponent)
    inst.componentInstance?.close.subscribe(()=>{
      inst.close();
    })
  }

  openRoomSettings(){
    const inst  = this.dialog.open(RoomSettingsComponent)
    inst.componentInstance?.cancel.subscribe(()=>{
      inst.close();
    })
  }
}
