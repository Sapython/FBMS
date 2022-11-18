import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Fuse from 'fuse.js';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {
  searchDebounceTimer:any;
  guests: any[] = [];
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(private dataProvider:DataProvider) { }

  ngOnInit(): void {
    this.guests = this.dataProvider.guests  
  }

  debounceSearch(event:any){
    try {
      clearTimeout(this.searchDebounceTimer)
      this.searchDebounceTimer = setTimeout(() => {
        this.search(event);
      },500)
    } catch (error) {
    }
  }

  search(event: any) {
    console.log("FIRED:",event)
    if (event.target.value.length > 0) {
      let fuse = new Fuse(this.dataProvider.guests, {
        keys: [
          'name',
          'email',
          'phoneNumber',
          'address',
          'aadhaarNumber',
          'panNumber',
        ],
      });
      const res = fuse.search(event.target.value);
      console.log("RESULTS:",res)
      const guestsData:any[] = []
      res.forEach((data: any) => {
        guestsData.push(data.item);
      });
      this.guests = JSON.parse(JSON.stringify(guestsData));
    } else {
      this.guests = this.dataProvider.guests;
    }
  }

}
