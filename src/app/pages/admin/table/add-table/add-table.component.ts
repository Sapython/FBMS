import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { SubCategory } from '../../menu/menu.component';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {
  active:boolean = false;
  ingredients:any[] = []
  options:any[] = []
  title:string = 'Add Table'
  files:any[] = []
  @Output() closeModal:EventEmitter<any> = new EventEmitter<any>()
  constructor(private sanitizer:DomSanitizer,private alertify:AlertsAndNotificationsService,private databaseService:DatabaseService,private dataProvider:DataProvider, @Inject(DIALOG_DATA) public dialogData:any) { }
  imageAcceptedFiles:string[] = [
    'image/jpeg',
    'image/png'
  ]
  tableForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    tableNo: new FormControl('',[Validators.required]),
    maxOccupancy: new FormControl(''),
  })
  ngOnInit(): void {
    if(this.dialogData.method=='edit'){
      this.title='Edit Table'
      this.tableForm.patchValue(this.dialogData.category)
      this.active = this.dialogData.category.isActive
    }
  }

  async addCategory(){
    console.log(this.tableForm.value);
    if (this.tableForm.valid){
      console.log(this.tableForm.value);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.addTable({...this.tableForm.value,booked:false}).then((res:any)=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Table Added Successfully')
        this.closeModal.emit()
      }).catch((err:any)=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Error Adding Table','error')
      })
      // const data:Category = {
      //   ...this.tableForm.value,
      //   isActive:this.active,
      //   discountList:'',
      //   created:new Date(),
      //   modified:new Date()
      // }
      // if (this.dialogData.method == 'edit') {
      //   this.databaseService.editRecipeCategory(data,this.dialogData.category.id).then(()=>{
      //     this.alertify.presentToast('Recipe Category Added')
      //   }).catch(err=>{
      //     this.alertify.presentToast(err)
      //   }).finally(()=>{
      //     this.dataProvider.pageSetting.blur = false;
      //     this.closeModal.emit()
      //     this.tableForm.reset()
      //   })
      // } else if (this.dialogData.method == 'add'){
      //   this.databaseService.addRecipeCategory(data).then(()=>{
      //     this.alertify.presentToast('Recipe Category Added')
      //   }).catch(err=>{
      //     this.alertify.presentToast(err)
      //   }).finally(()=>{
      //     this.dataProvider.pageSetting.blur = false;
      //     this.closeModal.emit()
      //     this.tableForm.reset()
      //   })
      // }
    } else {
      this.alertify.presentToast('Please fill all the fields')
    }
  }
}