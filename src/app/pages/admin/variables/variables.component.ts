import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {
  
  constructor(private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
  variablesForm:FormGroup = new FormGroup({
    teaspoonSize: new FormControl(''),
    tablespoonSize: new FormControl(''),
    cupSize: new FormControl(''),
    pintSize: new FormControl(''),
    quartSize: new FormControl(''),
    gallonSize: new FormControl(''),
    ounceSize: new FormControl('')
  });
  ngOnInit(): void {
    this.databaseService.getVariables().then((res:any)=>{
      this.variablesForm.patchValue(res.data());
    }).catch((err)=>{
      this.alertify.presentToast("Error fetching settings",'error');
    })
  }

  submit(){
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.saveVariables(this.variablesForm.value).then(()=>{
      this.alertify.presentToast("Settings saved successfully");
    }).catch((err)=>{
      this.alertify.presentToast("Error saving settings",'error');
    }).finally(()=>{
      this.ngOnInit()
      this.variablesForm.reset();
      this.dataProvider.pageSetting.blur = false;
    })
  }

}
