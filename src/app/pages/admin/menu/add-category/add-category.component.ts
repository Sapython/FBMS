import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { SubCategory } from '../menu.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
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
  categoryForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    displayName: new FormControl('',[Validators.required]),
    connectedMenu: new FormControl('',[Validators.required]),
  })
  ngOnInit(): void {
    if(this.dialogData.method=='edit'){
      this.title='Edit Category'
      this.categoryForm.patchValue(this.dialogData.category)
      this.active = this.dialogData.category.isActive
    }
  }

  async addCategory(){
    console.log(this.categoryForm.value);
    if (this.categoryForm.valid){
      console.log(this.categoryForm.value);
      this.dataProvider.pageSetting.blur = true;
      const data:SubCategory = {
        ...this.categoryForm.value,
        isActive:this.active,
        discountList:'',
        created:new Date(),
        modified:new Date()
      }
      if (this.dialogData.method == 'edit') {
        this.databaseService.editRecipeCategory(data,this.dialogData.category.id).then(()=>{
          this.alertify.presentToast('Recipe Category Added')
        }).catch(err=>{
          this.alertify.presentToast(err)
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
          this.closeModal.emit()
          this.categoryForm.reset()
        })
      } else if (this.dialogData.method == 'add'){
        this.databaseService.addRecipeCategory(data).then(()=>{
          this.alertify.presentToast('Recipe Category Added')
        }).catch(err=>{
          this.alertify.presentToast(err)
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
          this.closeModal.emit()
          this.categoryForm.reset()
        })
      }
    } else {
      this.alertify.presentToast('Please fill all the fields')
    }
  }
}
