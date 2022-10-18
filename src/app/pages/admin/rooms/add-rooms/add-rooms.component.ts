import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// import fusejs
import Fuse from 'fuse.js';

@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.scss']
})
export class AddRoomsComponent implements OnInit {
  @Output() closeModal:EventEmitter<any> = new EventEmitter<any>()
  active:boolean = false;
  ingredients:any[] = []
  options:any[] = []
  title:string = 'Add Table'
  files:any[] = []
  services:string[]=[
    'Wifi',
    'TV',
    'AC',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Laundry',
    'Parking',
    'Gym',
    'Swimming Pool',
    'Bar',
    'Restaurant',
    'Room Service',
    'Spa',
    'Sauna',
    'Steam Room',
    'Massage',
    'Hair Salon'
  ]
  searchResults:any[] = []
  imageAcceptedFiles:string[] = [
    'image/jpeg',
    'image/png'
  ]
  filteredServices:any[] = []
  separatorKeysCodes: number[] = [ENTER, COMMA];
  servicesCtrl = new FormControl('');
  @ViewChild('servicesInput') servicesInput: ElementRef<HTMLInputElement>;
  roomForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    images: new FormControl(''),
    tableNo: new FormControl('',[Validators.required]),
    maxOccupancy: new FormControl(''),
    roomPrice: new FormControl('',[Validators.required]),
    services: new FormControl(''),
  })
  constructor(private sanitizer:DomSanitizer,private alertify:AlertsAndNotificationsService,private databaseService:DatabaseService,private dataProvider:DataProvider, @Inject(DIALOG_DATA) public dialogData:any) {
    this.servicesCtrl.valueChanges.subscribe((res:any)=>{
      // use fuse js search
      const fuse = new Fuse(this.services, {
        includeScore: true,
        threshold: 0.3
      });
      this.searchResults = fuse.search(res).map((res:any)=>res.item)
    });
  }
  ngOnInit(): void {
    if(this.dialogData.method=='edit'){
      this.title='Edit Room'
      console.log(this.dialogData)
      this.roomForm.patchValue(this.dialogData.data)
      this.active = this.dialogData.data.isActive
      this.filteredServices = this.dialogData.data.services || []
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.services.splice(this.services.indexOf(event.option.viewValue), 1);
    this.filteredServices.push(event.option.viewValue);
    this.servicesInput.nativeElement.value = '';
    this.servicesCtrl.setValue(null);
  }
  removeFile(index:number){
    this.files.splice(index,1)
  }

  addFile(file:FileList){
    console.log(file);
    let problem = false;
    let files = Array.from(file);
    files.forEach((data)=>{
      console.log(data);
      if (this.imageAcceptedFiles.includes(data.type)){
        this.files.push({
          file:data,
          url:this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data))
        })
      } else {
        problem = true;
      }
    })
    if (problem){
      this.alertify.presentToast('Only jpeg and png files are allowed')
    }
    this.roomForm.controls['images'].setValue(this.files)
  }
  add(event:any): void {
    console.log('Event:',event)
    const value = (event.data || '').trim();
    // Add our fruit
    console.log("DATA:",value)
    if (value) {
      this.filteredServices.push(value);
    }
    // Clear the input value
    // event.chipInput!.clear();
    // this.servicesCtrl.setValue('');
  }
  remove(data:any){
    this.filteredServices.splice(this.services.indexOf(data),1)
  }
  async addRoom(){
    console.log(this.roomForm.value);
    console.log(this.dialogData,{...this.dialogData.data,...this.roomForm.value})

    if (this.roomForm.valid){
      console.log(this.roomForm.value);
      this.dataProvider.pageSetting.blur = true;
      if (this.dialogData.method =='edit'){
        this.databaseService.updateRoom({...this.dialogData.data,...this.roomForm.value,services:this.filteredServices},this.dialogData.data.id).then((res:any)=>{
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Room Updated Successfully')
          this.closeModal.emit()
        }).catch((err:any)=>{
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Error Updating Room','error')
        })
      } else {
        this.databaseService.addRoom({...this.roomForm.value,booked:false,type:'room',services:this.filteredServices  }).then((res:any)=>{
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Room Added Successfully')
          this.closeModal.emit()
        }).catch((err:any)=>{
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast('Error Adding Room','error')
        })
      }
    } else {
      this.alertify.presentToast('Please fill all the fields')
    }
  }
}