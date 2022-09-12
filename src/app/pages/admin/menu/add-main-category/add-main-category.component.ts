import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { SubCategory } from '../menu.component';

@Component({
  selector: 'app-add-main-category',
  templateUrl: './add-main-category.component.html',
  styleUrls: ['./add-main-category.component.scss']
})
export class AddMainCategoryComponent implements OnInit {
  @Output() closeModal:EventEmitter<any> = new EventEmitter<any>()
  active:boolean = false;
  ingredients:any[] = []
  options:any[] = []
  title:string = 'Add Category'
  files:any[] = []
  close(){
    this.closeModal.emit()
  }
  constructor(private sanitizer:DomSanitizer,private alertify:AlertsAndNotificationsService,private databaseService:DatabaseService,private dataProvider:DataProvider, @Inject(DIALOG_DATA) public dialogData:any) { }
  imageAcceptedFiles:string[] = [
    'image/jpeg',
    'image/png'
  ]
  addCategoryForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    subCategories: new FormControl('',[Validators.required]),
  })
  ngOnInit(): void {
    if(this.dialogData.method=='edit'){
      this.title='Edit Category'
      this.active = this.dialogData.category.isActive
      this.addCategoryForm.patchValue({
        name: this.dialogData.category.name,
        subCategories: this.dialogData.category.subCategories
      })
    }
  }

  async addCategory(){
    if(this.addCategoryForm.valid){
      if (this.dialogData.method == 'add') {
        this.dataProvider.pageSetting.blur = true;
        this.addCategoryForm.value['isActive'] = this.active
        this.addCategoryForm.value['created'] = new Date()
        this.addCategoryForm.value['modified'] = new Date()      
        this.databaseService.addMainCategory(this.addCategoryForm.value).then((doc)=>{
          this.alertify.presentToast('Category Added Successfully')
        }).catch((err)=>{
          this.alertify.presentToast('Error Adding Category')
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        })
      } else if (this.dialogData.method == 'edit') {
        this.dataProvider.pageSetting.blur = true;
        this.addCategoryForm.value['isActive'] = this.active
        this.addCategoryForm.value['modified'] = new Date()
        this.databaseService.updateMainCategory(this.dialogData.category.id,this.addCategoryForm.value).then((doc)=>{
          this.alertify.presentToast('Category Updated Successfully')
        }).catch((err)=>{
          this.alertify.presentToast('Error Updating Category')
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        })
      }
    }
  }
}
