import { Timestamp } from '@angular/fire/firestore';

export type CalendarEvent = {
  id?: string;
  name: string;
  type: string;
  startTime: Timestamp;
  endTime: Timestamp;
  noOfGuests: number;
  requiredService: string;
  description: string;
  customerId: string;
  assignedId: string;
};
