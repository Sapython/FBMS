import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit {
  units:Unit[] = [
    {
      id:'l',
      name:'liters'
    },
    {
      id:'kg',
      name:'kilogram'
    },
    {
      id:'dozen',
      name:'Dozen (Pack of 12 Items)'
    },
  ]

  stockItemForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    unit: new FormControl('',[Validators.required]),
    ratePerUnit: new FormControl('',[Validators.required]),
    image: new FormControl([],[Validators.required]),
    type: new FormControl('',[Validators.required]),
  })
  files:{file:File,url:SafeUrl}[] = []
  imageAcceptedFiles:string[] = [
    'image/jpeg',
    'image/png'
  ]
  constructor(private alertify:AlertsAndNotificationsService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

  dropped(event:any){
    console.log(event);
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
    this.stockItemForm.controls['image'].setValue(this.files)
  }

  finalValue(rate:any,quantity:any){
    console.log(rate,quantity);
    return Number(rate.value) * Number(quantity.value)
  }
}

export type Unit = {
  id: string;
  name: string;
}