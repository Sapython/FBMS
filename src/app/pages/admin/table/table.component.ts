import { Component, OnInit } from '@angular/core';
import { slot, timeSlots } from 'src/app/structures/time-slot.structure';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  viewBookedTables: boolean = false;
  timeSlots: slot[] = timeSlots;

  selectedDate: Date = new Date();
  selectedSlot: slot;

  showCalendar: boolean = false;
  showSlots: boolean = false;

  constructor() {}

  ngOnInit(): void {
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
}
