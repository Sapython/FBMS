import { Injectable } from '@angular/core';
import { jsPDF, jsPDFOptions } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class RoomBillService {

  constructor() {
    // this.generatePDF({
    //   roomNumber: 1,
    //   roomType: 'Single',
    //   roomPrice: 100, 
    //   roomTax: 10,
    //   roomTotal: 110,
    //   roomCheckIn: new Date(),
    //   roomCheckOut: new Date(),
    //   roomDays: 1,
    //   roomGuests: [],
    //   bookingType: 'Online',
    //   paymentMode: 'Checked In'
    // } as BillData);
  }

  public generatePDF(billData:BillData) {
    const doc = new jsPDF();
    // room bill
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.setFontSize(20);
    doc.text('Room Bill', pageWidth / 2 , 22,{align:'center'});
    doc.addImage('Hotel Triveni Sangam', 'PNG', 10, 10, 30, 30);
    // doc.setFontSize(12);
    // doc.text('Room Number: ' + billData.roomNumber, 14, 30);
    // doc.text('Room Type: ' + billData.roomType, 14, 35);
    // doc.text('Room Price: ' + billData.roomPrice, 14, 40);
    // doc.text('Room Tax: ' + billData.roomTax, 14, 45);
    // doc.text('Room Total: ' + billData.roomTotal, 14, 50);
    // doc.text('Room Check In: ' + billData.roomCheckIn, 14, 55);
    // doc.text('Room Check Out: ' + billData.roomCheckOut, 14, 60);
    // doc.text('Room Days: ' + billData.roomDays, 14, 65);
    // doc.text('Room Guests: ' + billData.roomGuests, 14, 70);
    // doc.text('Booking Type: ' + billData.bookingType, 14, 75);
    // doc.text('Payment Mode: ' + billData.paymentMode, 14, 80);
    doc.save('a4.pdf');
  }
}

export type BillData = {
  roomNumber: number,
  roomType: string,
  roomPrice: number,
  roomTax: number,
  roomTotal: number,
  roomCheckIn: Date,
  roomCheckOut: Date,
  roomDays: number,
  roomGuests: RoomGuest[],
  bookingType: string,
  paymentMode: string
}

export type RoomGuest = {
  guestName: string,
  guestAge?: number,
  guestGender?: string,
  guestId: string,
  guestPhone?: string,
  guestEmail?: string,
  guestAddress?: string,
  guestAadhaar?: string,
  guestPan?: string,
}