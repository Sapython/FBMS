import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { QrSettingsComponent } from './qr-settings/qr-settings.component';

@Component({
  selector: 'app-qr-menu',
  templateUrl: './qr-menu.component.html',
  styleUrls: ['./qr-menu.component.scss']
})
export class QrMenuComponent implements OnInit {
  constructor(private databaseService:DatabaseService,private dilaog:Dialog,private dataProvider:DataProvider,private alertify:AlertsAndNotificationsService) { }

  ngOnInit(): void {
      
  }

  getQrCode(){

  }

  editQrSettings(){
    const inst = this.dilaog.open(QrSettingsComponent)
    // inst.
  }
}
