import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
  settingForm:FormGroup = new FormGroup({
    kotTokenRefreshTime: new FormControl(''),
    billTokenRefreshTime: new FormControl('')
  });
  ngOnInit(): void {
    this.databaseService.getSettings().then((res:any)=>{
      this.settingForm.patchValue(res.data());
    }).catch((err)=>{
      this.alertify.presentToast("Error fetching settings",'error');
    })
  }

  submit(){
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.saveSettings(this.settingForm.value).then(()=>{
      this.alertify.presentToast("Settings saved successfully");
    }).catch((err)=>{
      this.alertify.presentToast("Error saving settings",'error');
    }).finally(()=>{
      this.ngOnInit()
      this.settingForm.reset();
      this.dataProvider.pageSetting.blur = false;
    })
  }

}
