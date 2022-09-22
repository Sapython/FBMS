import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';

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
      id:'g',
      name:'grams'
    },
    {
      id:'ml',
      name:'milliliters'
    },
    {
      id:'mg',
      name:'milligrams'
    },
    {
      id:'tin',
      name:'Tin'
    },
    {
      id:'btl',
      name:'Bottle'
    },
    {
      id:'pcs',
      name:'pieces'
    },
    {
      id:'dozen',
      name:'Dozen (Pack of 12 Items)'
    },
  ]
  categories:string[] = []
  stockItemForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    unit: new FormControl('',[Validators.required]),
    ratePerUnit: new FormControl('',[Validators.required]),
    images: new FormControl([]),
    category: new FormControl('',[Validators.required]),
    warningThreshold: new FormControl('',[]),
    errorThreshold: new FormControl('',[]),
  })
  files:{file:File,url:SafeUrl,type?:'preloaded'|undefined,onlineUrl?:string}[] = []
  imageAcceptedFiles:string[] = [
    'image/jpeg',
    'image/png'
  ]
  title:string = 'Add New Ingredient'
  @Output() hideModal:EventEmitter<any> = new EventEmitter()
  constructor(private alertify:AlertsAndNotificationsService,@Inject(DIALOG_DATA) public dialogData: any,private sanitizer:DomSanitizer,private databaseService:DatabaseService,private dataProvider:DataProvider) { }

  ngOnInit(): void {
    if (this.dialogData.method == 'duplicate'){
      this.title = 'Duplicate Ingredient'
      this.stockItemForm.patchValue(this.dialogData.data)
      this.files = this.dialogData.data.images.map((image:any)=>{
        return {
          file:null,
          onlineUrl:image,
          type:'preloaded'
        }
      })
      this.stockItemForm.controls['images'].setValue(this.files)
    } else if (this.dialogData.method == 'edit'){
      this.title = 'Edit Ingredient'
      this.stockItemForm.patchValue(this.dialogData.data)
      this.files = this.dialogData.data.images.map((image:any)=>{
        return {
          file:null,
          onlineUrl:image,
          type:'preloaded'
        }
      })
      this.stockItemForm.controls['images'].setValue(this.files)
    }
    this.databaseService.getIngredientCategories().then((doc:any)=>{
      this.categories = doc.data().categories
      console.log("this.categories",this.categories);
    })
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
    this.stockItemForm.controls['images'].setValue(this.files)
  }

  finalValue(rate:any,quantity:any){
    // console.log(rate,quantity);
    return Number(rate.value) * Number(quantity.value)
  }

  async addIngredient(){
    console.log(this.stockItemForm.value);
    if (this.stockItemForm.valid){
      this.dataProvider.pageSetting.blur = true;
      const uploadedFiles:string[] = []
      console.log("this.files",this.files);
      for (const file of this.files) {
        if (file.type == 'preloaded' && file.onlineUrl){
          uploadedFiles.push(file.onlineUrl)
        } else {
          uploadedFiles.push(await this.databaseService.upload('business/accounts/'+this.dataProvider.currentProject?.projectId +'/ingredients/ingredients/'+file.file.name+(new Date()).toISOString(),file.file))
        }
      }
      if (uploadedFiles.length > 0){
        this.stockItemForm.controls['images'].setValue(uploadedFiles)
      }
      console.log("this.stockItemForm.value",this.stockItemForm.value,this.dialogData.method);
     if (this.dialogData.method == 'add' || this.dialogData.method == 'duplicate') {
      this.databaseService.addIngredient(this.stockItemForm.value).then(()=>{
        this.alertify.presentToast('Ingredient Added')
      }).catch(err=>{
        this.alertify.presentToast(err)
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
        this.stockItemForm.reset()
        this.hideModal.emit()
      })
     } else if (this.dialogData.method == 'edit'){
      this.databaseService.updateIngredient(this.stockItemForm.value,this.dialogData.data.id).then(()=>{
        this.alertify.presentToast('Ingredient Updated')
      }).catch(err=>{
        this.alertify.presentToast(err)
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
        this.stockItemForm.reset()
        this.hideModal.emit()
      })
     }
    }
  }
}

export type Unit = {
  id: string;
  name: string;
}