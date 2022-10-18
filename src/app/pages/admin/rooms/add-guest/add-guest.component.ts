import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.scss'],
})
export class AddGuestComponent implements OnInit {
  guests: any[] = [];
  panImageFile: File | undefined;
  aadhaarImageFile: File | undefined;
  searchDebounceTimer:any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(
    public dataProvider: DataProvider,
    private databaseService: DatabaseService
  ) {}
  addGuestMode: boolean = false;
  guestForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email]),
    gender: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.pattern('[0-9]{10}')]),
    address: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    aadhaarNumber: new FormControl('', [Validators.pattern('[0-9]{12}')]),
    panNumber: new FormControl('', [
      Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
    ]),
    aadhaarImage: new FormControl(''),
    panImage: new FormControl(''),
  });

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
      if(res.length==0){
        this.addGuestMode = true;
        this.guestForm.controls['name'].setValue(event.target.value)
      }
      this.guests = JSON.parse(JSON.stringify(guestsData));
    } else {
      this.guests = this.dataProvider.guests;
    }
  }
  ngOnInit(): void {this.guests = this.dataProvider.guests}

  setImage(type: 'aadhaar' | 'pan', data: any) {
    // check file size and check if it's image type only
    if (data.target.files[0].size > 1000000) {
      data.target.value = [];
      alert('File size is too large');
      return;
    }
    if (!data.target.files[0].type.includes('image')) {
      alert('File is not an image');
      data.target.value = [];
      return;
    }
    if (type == 'aadhaar') {
      this.aadhaarImageFile = data.target.files[0];
    } else if (type == 'pan') {
      this.panImageFile = data.target.files[0];
    }
    console.log(this.aadhaarImageFile, this.panImageFile);
  }

  async addGuest() {
    console.log(this.guestForm);
    if (this.guestForm.valid && this.aadhaarImageFile && this.panImageFile) {
      this.dataProvider.pageSetting.blur = true;
      this.guestForm.value.aadhaarImage = await this.databaseService.upload(
        'business/' +
          this.dataProvider.currentProject.projectId +
          '/rooms/images/aadhaar/' +
          this.aadhaarImageFile.name,
        this.aadhaarImageFile
      );
      this.guestForm.value.panImage = await this.databaseService.upload(
        'business/' +
          this.dataProvider.currentProject.projectId +
          '/rooms/images/pan/' +
          this.panImageFile.name,
        this.panImageFile
      );
      this.databaseService
        .addGuest(this.guestForm.value)
        .then((data: any) => {
          this.close.emit(this.guestForm.value);
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          this.guestForm.reset();
          this.aadhaarImageFile = undefined;
          this.panImageFile = undefined;
          this.dataProvider.pageSetting.blur = false;
        });
    } else {
      alert('Please fill all the fields');
    }
  }
}
