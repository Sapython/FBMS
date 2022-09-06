import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Discount, Tax } from '../menu.component';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  active:boolean = false;
  ingredients:any[] = []
  options:any[] = []
  title:string = 'Add Discount'
  files:any[] = []
  @Output() closeModal:EventEmitter<any> = new EventEmitter<any>()
  constructor(private sanitizer:DomSanitizer,private alertify:AlertsAndNotificationsService,private databaseService:DatabaseService,private dataProvider:DataProvider, @Inject(DIALOG_DATA) public dialogData:any) { }

  imageAcceptedFiles:string[] = [
    'image/jpeg',
    'image/png'
  ]
  discountForm:FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    startPrice: new FormControl('',[Validators.required]),
    endPrice: new FormControl('',[Validators.required]),
    startTime: new FormControl('',[Validators.required]),
    endTime: new FormControl('',[Validators.required]),
    startDate: new FormControl('',[Validators.required]),
    endDate: new FormControl('',[Validators.required]),
    discountType: new FormControl('',[Validators.required]),
    discountValue: new FormControl('',[Validators.required]),
    maxDiscount: new FormControl('',[Validators.required]),
    days: new FormControl('',[Validators.required]),
    discountCode: new FormControl('',[Validators.required]),
  })

  ngOnInit(): void {
    if(this.dialogData.method=='edit'){
      this.title='Edit Discount'
      // alert(this.dialogData.discount.id)
      const data = JSON.parse(JSON.stringify(this.dialogData.discount))
      data['startDate'] = this.dialogData.discount['startDate'].toDate()
      data['endDate'] = this.dialogData.discount['endDate'].toDate()
      this.discountForm.patchValue(data)
      this.active = this.dialogData.discount.active
    }
  }

  async addCategory(){
    console.log(this.discountForm.value);
    if (this.discountForm.valid){
      console.log(this.discountForm.value);
      this.dataProvider.pageSetting.blur = true;
      const data:Discount = {
        ...this.discountForm.value,
        active:this.active,
        checked:false
      }
      console.log(data);
      if(this.dialogData.method=='edit'){
        this.databaseService.updateDiscount(data,this.dialogData.discount.id).then(()=>{
          this.alertify.presentToast('Discount Updated')
        }).catch(err=>{
          this.alertify.presentToast(err)
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
          this.closeModal.emit()
          this.discountForm.reset()
        })
      } else if (this.dialogData.method=='add'){
        this.databaseService.addDiscount(data).then(()=>{
          this.alertify.presentToast('Discount Added')
        }).catch(err=>{
          this.alertify.presentToast(err)
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
          this.closeModal.emit()
          this.discountForm.reset()
        })
      }
    } else {
      this.alertify.presentToast('Please fill all the fields')
    }
  }
  
}