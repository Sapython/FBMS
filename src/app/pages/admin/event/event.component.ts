import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { CalendarEvent } from 'src/app/structures/calendar-event.structure';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  events: CalendarEvent[] = [
    {
      name: 'Event 1',
      type: 'Room',
      startTime: Timestamp.now(),
      endTime: Timestamp.now(),
      noOfGuests: 5,
      requiredService: 'Hosting',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente est iusto repellat nisi similique recusandae, doloribus delectus beatae maiores saepe.',
      customerId: 'string',
      assignedId: 'string',
    },
    {
      name: 'Event 1',
      type: 'Room',
      startTime: Timestamp.now(),
      endTime: Timestamp.now(),
      noOfGuests: 5,
      requiredService: 'Hosting',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente est iusto repellat nisi similique recusandae, doloribus delectus beatae maiores saepe.',
      customerId: 'string',
      assignedId: 'string',
    },
    {
      name: 'Event 1',
      type: 'Room',
      startTime: Timestamp.now(),
      endTime: Timestamp.now(),
      noOfGuests: 5,
      requiredService: 'Hosting',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente est iusto repellat nisi similique recusandae, doloribus delectus beatae maiores saepe.',
      customerId: 'string',
      assignedId: 'string',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
