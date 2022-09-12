import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { SubCategory, Tax } from '../menu.component';

@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent implements OnInit {
  active:boolean = false;
  ingredients:any[] = []
  options:any[] = []
  title:string = 'Add Category'
  files:any[] = []
  @Output() closeModal:EventEmitter<any> = new EventEmitter<any>()
  constructor(private sanitizer:DomSanitizer,private alertify:AlertsAndNotificationsService,private databaseService:DatabaseService,private dataProvider:DataProvider, @Inject(DIALOG_DATA) public dialogData:any) { }
  imageAcceptedFiles:string[] = [
    'image/jpeg',
    'image/png'
  ]
  taxForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    displayName: new FormControl('',[Validators.required]),
    taxType: new FormControl('',[Validators.required]),
    priceType: new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required]),
    order: new FormControl('',[Validators.required]),
  })
  ngOnInit(): void {
    if(this.dialogData.method=='edit'){
      this.title='Edit Tax'
      this.taxForm.patchValue(this.dialogData.tax)
      this.active = this.dialogData.tax.status
    }
  }

  async addCategory(){
    console.log(this.taxForm.value);
    if (this.taxForm.valid){
      console.log(this.taxForm.value);
      this.dataProvider.pageSetting.blur = true;
      const data:Tax = {
        ...this.taxForm.value,
        status:this.active,
        created:new Date(),
        checked:false,
      }
      if(this.dialogData.method=='edit'){
        this.databaseService.updateTax(data,this.dialogData.id).then(()=>{
          this.alertify.presentToast('Recipe Category Updated')
        }).catch(err=>{
          this.alertify.presentToast(err)
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
          this.closeModal.emit()
          this.taxForm.reset()
        })
      } else if (this.dialogData.method=='add'){
        this.databaseService.addTax(data).then(()=>{
          this.alertify.presentToast('Recipe Category Added')
        }).catch(err=>{
          this.alertify.presentToast(err)
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
          this.closeModal.emit()
          this.taxForm.reset()
        })
      }
    } else {
      this.alertify.presentToast('Please fill all the fields')
    }
  }
  
}