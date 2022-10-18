import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { TableRoutingModule } from '../table/table-routing.module';
import { BookRoomComponent } from './book-room/book-room.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GuestsComponent } from './guests/guests.component';
import { AddGuestComponent } from './add-guest/add-guest.component';
import {MatChipsModule} from '@angular/material/chips';
import { SeeBookingComponent } from './see-booking/see-booking.component'; 
@NgModule({
  declarations: [
    RoomsComponent,
    AddRoomsComponent,
    BookRoomComponent,
    GuestsComponent,
    AddGuestComponent,
    SeeBookingComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatChipsModule
  ]
})
export class RoomsModule { }
